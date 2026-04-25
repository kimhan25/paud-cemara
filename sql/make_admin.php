<?php
/**
 * CLI helper: buat / reset password admin.
 * Jalankan dari root project:
 *     php sql/make_admin.php
 *
 * Tanpa argumen = interaktif. Dengan argumen:
 *     php sql/make_admin.php admin rahasia123
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "Hanya untuk CLI.\n");
    exit(1);
}

$config = require __DIR__ . '/../api/config.php';
$cfg = $config['db'];

$username = $argv[1] ?? null;
$password = $argv[2] ?? null;

if (!$username) {
    echo "Username admin (default: admin): ";
    $in = trim(fgets(STDIN) ?: '');
    $username = $in !== '' ? $in : 'admin';
}
if (!$password) {
    echo "Password baru: ";
    // Sembunyikan input kalau bisa
    if (stripos(PHP_OS_FAMILY, 'Windows') !== 0) {
        system('stty -echo');
    }
    $password = trim(fgets(STDIN) ?: '');
    if (stripos(PHP_OS_FAMILY, 'Windows') !== 0) {
        system('stty echo');
        echo "\n";
    }
}

if ($password === '' || strlen($password) < 6) {
    fwrite(STDERR, "Password minimal 6 karakter.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT);

try {
    $dsnParts = [
        "host={$cfg['host']}",
        "port={$cfg['port']}",
        "dbname={$cfg['dbname']}",
    ];
    if (!empty($cfg['sslmode'])) {
        $dsnParts[] = 'sslmode=' . $cfg['sslmode'];
    }
    $dsn = 'pgsql:' . implode(';', $dsnParts);
    $pdo = new PDO($dsn, $cfg['user'], $cfg['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    // Upsert
    $sql = 'INSERT INTO admin_user (username, password_hash) VALUES (:u, :h)
            ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash';
    $pdo->prepare($sql)->execute([':u' => $username, ':h' => $hash]);

    echo "OK. Admin '{$username}' siap. Login via halaman /#/admin.\n";
} catch (Throwable $e) {
    fwrite(STDERR, "Gagal: " . $e->getMessage() . "\n");
    exit(1);
}
