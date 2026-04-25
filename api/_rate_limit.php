<?php
/**
 * Rate limit file-based sederhana.
 * Fail-open: kalau direktori/file tidak bisa ditulis, request tetap lanjut.
 */

declare(strict_types=1);

require_once __DIR__ . '/_request.php';

function rateLimitDir(): string
{
    $cfg = requestConfig();
    $dir = (string)($cfg['rate_limit_dir'] ?? (sys_get_temp_dir() . '/paud-cemara-rate-limit'));
    if ($dir !== '' && !is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    return $dir;
}

function rateLimitFile(string $bucket): string
{
    $fingerprint = requestClientIp();
    $hash = sha1($bucket . '|' . $fingerprint);
    return rtrim(rateLimitDir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $hash . '.json';
}

function enforceRateLimit(string $bucket, int $limit, int $windowSeconds, ?int $cooldownSeconds = null): void
{
    $dir = rateLimitDir();
    if ($dir === '' || !is_dir($dir)) {
        return;
    }

    $cooldownSeconds ??= $windowSeconds;
    $file = rateLimitFile($bucket);
    $fh = @fopen($file, 'c+');
    if (!$fh) {
        return;
    }

    $now = time();

    try {
        if (!flock($fh, LOCK_EX)) {
            fclose($fh);
            return;
        }

        $raw = stream_get_contents($fh);
        $state = json_decode($raw ?: '', true);
        if (!is_array($state)) {
            $state = [
                'window_start' => $now,
                'count' => 0,
                'blocked_until' => 0,
            ];
        }

        $blockedUntil = (int)($state['blocked_until'] ?? 0);
        if ($blockedUntil > $now) {
            $retryAfter = max(1, $blockedUntil - $now);
            header('Retry-After: ' . $retryAfter);
            jsonErr('Terlalu banyak percobaan. Coba lagi beberapa menit.', 429, [
                'retry_after' => $retryAfter,
            ]);
        }

        $windowStart = (int)($state['window_start'] ?? 0);
        if ($windowStart <= 0 || ($now - $windowStart) >= $windowSeconds) {
            $state['window_start'] = $now;
            $state['count'] = 0;
            $state['blocked_until'] = 0;
        }

        $state['count'] = (int)($state['count'] ?? 0) + 1;
        if ($state['count'] > $limit) {
            $state['blocked_until'] = $now + $cooldownSeconds;
            ftruncate($fh, 0);
            rewind($fh);
            fwrite($fh, json_encode($state));
            fflush($fh);

            $retryAfter = max(1, $cooldownSeconds);
            header('Retry-After: ' . $retryAfter);
            jsonErr('Terlalu banyak percobaan. Coba lagi beberapa menit.', 429, [
                'retry_after' => $retryAfter,
            ]);
        }

        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($state));
        fflush($fh);
        flock($fh, LOCK_UN);
        fclose($fh);
    } catch (Throwable $e) {
        if (is_resource($fh)) {
            @flock($fh, LOCK_UN);
            @fclose($fh);
        }
    }
}
