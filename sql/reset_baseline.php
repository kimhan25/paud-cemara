<?php
/**
 * CLI helper: reset data konten/demo ke baseline `seed.sql`
 * tanpa menghapus akun admin.
 *
 * Jalankan dari root project:
 *   php sql/reset_baseline.php
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "Hanya untuk CLI.\n");
    exit(1);
}

$config = require __DIR__ . '/../api/config.php';
$dbCfg = $config['db'];

function connectPdo(array $dbCfg): PDO
{
    $dsn = "pgsql:host={$dbCfg['host']};port={$dbCfg['port']};dbname={$dbCfg['dbname']}";
    return new PDO($dsn, $dbCfg['user'], $dbCfg['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
}

function clearDirectory(string $dir): void
{
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
        return;
    }

    $items = scandir($dir);
    if (!is_array($items)) return;

    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === '.gitkeep' || $item === '.htaccess') {
            continue;
        }
        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            clearDirectory($path);
            @rmdir($path);
            continue;
        }
        @unlink($path);
    }
}

$tables = [
    'registrations',
    'messages',
    'day_schedule',
    'fees',
    'history_entries',
    'facilities',
    'hero_stats',
    'teachers',
    'news',
    'gallery_items',
    'albums',
    'programs',
    'settings',
];

$seedSql = file_get_contents(__DIR__ . '/seed.sql');
if ($seedSql === false || trim($seedSql) === '') {
    fwrite(STDERR, "Gagal membaca sql/seed.sql\n");
    exit(1);
}

try {
    $pdo = connectPdo($dbCfg);
    $pdo->beginTransaction();

    foreach ($tables as $table) {
        $pdo->exec("TRUNCATE TABLE {$table} RESTART IDENTITY CASCADE");
    }

    $pdo->exec($seedSql);
    $pdo->commit();

    $uploadBase = rtrim((string)$config['upload_dir'], DIRECTORY_SEPARATOR);
    foreach (['gallery', 'news', 'settings', 'teachers'] as $subdir) {
        clearDirectory($uploadBase . DIRECTORY_SEPARATOR . $subdir);
    }

    $newsCount = (int)$pdo->query('SELECT COUNT(*) FROM news')->fetchColumn();
    $galleryCount = (int)$pdo->query('SELECT COUNT(*) FROM gallery_items')->fetchColumn();
    $messageCount = (int)$pdo->query('SELECT COUNT(*) FROM messages')->fetchColumn();
    $registrationCount = (int)$pdo->query('SELECT COUNT(*) FROM registrations')->fetchColumn();

    echo "OK. Data baseline dipulihkan.\n";
    echo "- news: {$newsCount}\n";
    echo "- gallery: {$galleryCount}\n";
    echo "- messages: {$messageCount}\n";
    echo "- registrations: {$registrationCount}\n";
    echo "- admin user dipertahankan\n";
} catch (Throwable $e) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    fwrite(STDERR, "Gagal reset baseline: {$e->getMessage()}\n");
    exit(1);
}
