<?php
/**
 * POST   /api/admin/upload.php
 * DELETE /api/admin/upload.php
 *
 * Multipart form-data:
 *   file  — image file (JPG/PNG/WEBP/GIF)
 *   kind  — "gallery" | "news" | "settings" | "teachers"
 *
 * Response: { ok, path: "uploads/gallery/xxxxx.jpg", url: "/uploads/..." }
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
require __DIR__ . '/../_uploads.php';
requireAdminSession();

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'DELETE') {
    $in = readJsonBody();
    $path = is_array($in) ? ($in['path'] ?? null) : null;
    deleteManagedUpload(is_string($path) ? $path : null);
    jsonOk(['ok' => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonErr('Method not allowed', 405);
}

$kind = preg_replace('/[^a-z]/', '', strtolower((string)($_POST['kind'] ?? 'gallery')));
if (!in_array($kind, ['gallery', 'news', 'settings', 'teachers'], true)) {
    jsonErr('Kind tidak valid', 422);
}

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $codes = [
        UPLOAD_ERR_INI_SIZE  => 'File terlalu besar (batas php.ini)',
        UPLOAD_ERR_FORM_SIZE => 'File terlalu besar',
        UPLOAD_ERR_PARTIAL   => 'Upload tidak selesai',
        UPLOAD_ERR_NO_FILE   => 'File tidak dikirim',
        UPLOAD_ERR_NO_TMP_DIR=> 'Tidak ada direktori tmp',
        UPLOAD_ERR_CANT_WRITE=> 'Gagal menulis ke disk',
    ];
    jsonErr($codes[$_FILES['file']['error'] ?? 0] ?? 'Upload gagal', 400);
}

$f = $_FILES['file'];
if ($f['size'] > 8 * 1024 * 1024) jsonErr('Maks 8 MB', 413);

// Validasi MIME via finfo (bukan hanya dari client)
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime  = (string)$finfo->file($f['tmp_name']);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
];
if (!isset($allowed[$mime])) jsonErr('Format tidak didukung (JPG/PNG/WEBP/GIF)', 415);
$ext = $allowed[$mime];

// Nama file acak supaya tidak tabrakan
$name = date('Ymd') . '-' . bin2hex(random_bytes(5)) . '.' . $ext;

$cfg = require __DIR__ . '/../config.php';
$baseDir = rtrim($cfg['upload_dir'], '/') . '/' . $kind;
if (!is_dir($baseDir) && !@mkdir($baseDir, 0775, true)) {
    jsonErr('Direktori upload tidak bisa dibuat', 500);
}

$dest = $baseDir . '/' . $name;
if (!move_uploaded_file($f['tmp_name'], $dest)) {
    jsonErr('Gagal simpan file', 500);
}
@chmod($dest, 0644);

// Path relatif untuk disimpan di DB
$rel = 'uploads/' . $kind . '/' . $name;

jsonOk([
    'ok'   => true,
    'path' => $rel,
    'url'  => '/' . $rel,
    'mime' => $mime,
    'size' => filesize($dest),
], 201);
