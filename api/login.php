<?php
/**
 * POST /api/login.php   body: { username, password }
 * Verifikasi password (bcrypt) + set session.
 */

require __DIR__ . '/db.php';
require __DIR__ . '/_session.php';
require __DIR__ . '/_rate_limit.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonErr('Method not allowed', 405);
}

$in = readJsonBody();
$username = trim((string)($in['username'] ?? ''));
$password = (string)($in['password'] ?? '');

// UI prototype pakai field 'email'; terima juga key itu sebagai username.
if ($username === '' && !empty($in['email'])) {
    $username = trim((string)$in['email']);
    // Kalau berupa email, ambil bagian sebelum '@' sebagai username.
    if (str_contains($username, '@')) $username = explode('@', $username, 2)[0];
}

if ($username === '' || $password === '') {
    jsonErr('Username dan password wajib diisi', 422);
}

enforceRateLimit('login', 8, 10 * 60, 15 * 60);

$stmt = pdo()->prepare('SELECT id, username, password_hash FROM admin_user WHERE username = :u LIMIT 1');
$stmt->execute([':u' => $username]);
$row = $stmt->fetch();

if (!$row || !password_verify($password, $row['password_hash'])) {
    // Delay kecil untuk mengurangi brute-force timing attack
    usleep(300_000);
    jsonErr('Username atau password salah', 401);
}

// Rotate session id supaya aman dari session fixation
startSession();
session_regenerate_id(true);
$_SESSION['admin_id']        = (int)$row['id'];
$_SESSION['admin_username']  = (string)$row['username'];
$_SESSION['last_activity']   = time();

jsonOk([
    'ok'   => true,
    'user' => [
        'id'       => (int)$row['id'],
        'username' => (string)$row['username'],
    ],
]);
