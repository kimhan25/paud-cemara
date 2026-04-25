<?php
/**
 * Helper request environment: HTTPS detection dan client IP.
 */

declare(strict_types=1);

function requestConfig(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/config.php';
    }
    return $cfg;
}

function requestIsHttps(): bool
{
    $cfg = requestConfig();

    if (!empty($cfg['force_secure_session'])) {
        return true;
    }

    $https = (!empty($_SERVER['HTTPS']) && strtolower((string)$_SERVER['HTTPS']) !== 'off')
          || (string)($_SERVER['REQUEST_SCHEME'] ?? '') === 'https'
          || (string)($_SERVER['SERVER_PORT'] ?? '') === '443';
    if ($https) {
        return true;
    }

    if (empty($cfg['trust_proxy'])) {
        return false;
    }

    $forwardedProto = strtolower(trim((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')));
    if ($forwardedProto !== '') {
        $parts = array_map('trim', explode(',', $forwardedProto));
        if (in_array('https', $parts, true)) {
            return true;
        }
    }

    $forwardedSsl = strtolower(trim((string)($_SERVER['HTTP_X_FORWARDED_SSL'] ?? '')));
    if (in_array($forwardedSsl, ['on', '1', 'true', 'yes'], true)) {
        return true;
    }

    return (string)($_SERVER['HTTP_X_FORWARDED_PORT'] ?? '') === '443';
}

function requestClientIp(): string
{
    $cfg = requestConfig();

    if (!empty($cfg['trust_proxy'])) {
        $candidates = [
            (string)($_SERVER['HTTP_CF_CONNECTING_IP'] ?? ''),
            (string)($_SERVER['HTTP_X_REAL_IP'] ?? ''),
            (string)($_SERVER['HTTP_X_FORWARDED_FOR'] ?? ''),
        ];

        foreach ($candidates as $raw) {
            if ($raw === '') continue;
            foreach (explode(',', $raw) as $part) {
                $ip = trim($part);
                if ($ip !== '') {
                    return $ip;
                }
            }
        }
    }

    $remote = trim((string)($_SERVER['REMOTE_ADDR'] ?? ''));
    return $remote !== '' ? $remote : '0.0.0.0';
}
