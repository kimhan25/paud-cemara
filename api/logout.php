<?php
/**
 * POST /api/logout.php  — hapus session.
 */

require __DIR__ . '/db.php';
require __DIR__ . '/_session.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonErr('Method not allowed', 405);
}

startSession();
$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
}
session_destroy();

jsonOk(['ok' => true]);
