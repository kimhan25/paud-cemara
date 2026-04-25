<?php
/**
 * Helper session: dipanggil setelah db.php supaya session name/cookie
 * konsisten antar endpoint.
 */

require_once __DIR__ . '/_request.php';

function startSession(): void {
    if (session_status() !== PHP_SESSION_NONE) return;

    $cfg = require __DIR__ . '/config.php';
    session_name($cfg['session_name']);

    // Cookie params: HttpOnly + SameSite=Lax. Secure aktif untuk HTTPS
    // dan bisa dipaksa saat app berada di balik reverse proxy.
    $https = requestIsHttps();

    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $https,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function currentAdmin(): ?array {
    startSession();
    if (empty($_SESSION['admin_id'])) return null;

    // Idle timeout: auto-logout setelah 2 jam tanpa aktivitas
    $now  = time();
    $last = (int)($_SESSION['last_activity'] ?? 0);
    $IDLE_LIMIT = 2 * 60 * 60;
    if ($last > 0 && ($now - $last) > $IDLE_LIMIT) {
        $_SESSION = [];
        session_destroy();
        return null;
    }
    $_SESSION['last_activity'] = $now;

    return [
        'id'       => (int)$_SESSION['admin_id'],
        'username' => (string)$_SESSION['admin_username'],
    ];
}

function requireAdminSession(): array {
    $a = currentAdmin();
    if (!$a) jsonErr('Unauthorized', 401);
    return $a;
}
