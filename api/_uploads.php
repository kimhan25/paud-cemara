<?php
/**
 * Helper untuk file upload yang disimpan di dalam folder `uploads/`.
 */

declare(strict_types=1);

function normalizeManagedUploadPath(?string $relPath): ?string
{
    if ($relPath === null) return null;
    $relPath = ltrim(trim($relPath), '/');
    if ($relPath === '') return null;

    if (!preg_match('#^uploads/[a-z0-9_-]+/[A-Za-z0-9._-]+$#', $relPath)) {
        return null;
    }

    return $relPath;
}

function deleteManagedUpload(?string $relPath): void
{
    $normalized = normalizeManagedUploadPath($relPath);
    if ($normalized === null) return;

    $cfg = require __DIR__ . '/config.php';
    $uploadBase = realpath((string)$cfg['upload_dir']);
    $projectRoot = realpath(dirname((string)$cfg['upload_dir']));
    if (!$uploadBase || !$projectRoot) return;

    $absPath = $projectRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $normalized);
    $realFile = realpath($absPath);
    if (!$realFile || !is_file($realFile)) return;

    if (str_starts_with($realFile, $uploadBase . DIRECTORY_SEPARATOR) || $realFile === $uploadBase) {
        @unlink($realFile);
    }
}

function cleanupReplacedUpload(?string $previousPath, ?string $nextPath): void
{
    $previous = normalizeManagedUploadPath($previousPath);
    $next = normalizeManagedUploadPath($nextPath);

    if ($previous !== null && $previous !== $next) {
        deleteManagedUpload($previous);
    }
}
