<?php
/**
 * Bootstrap umum untuk semua endpoint:
 * - Connect ke Postgres via PDO
 * - Set header JSON + CORS
 * - Helper jsonOk / jsonErr / readJsonBody
 */

declare(strict_types=1);

$config = require __DIR__ . '/config.php';

// ---------- CORS + JSON headers ----------------------------------------
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$requestOrigin = trim((string)($_SERVER['HTTP_ORIGIN'] ?? ''));
$allowedOrigins = array_values(array_filter(array_map(
    'trim',
    preg_split('/\s*,\s*/', (string)($config['cors_origin'] ?? '')) ?: []
)));

if ($requestOrigin !== '' && $allowedOrigins !== []) {
    $allowAnyOrigin = in_array('*', $allowedOrigins, true);
    if ($allowAnyOrigin || in_array($requestOrigin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $requestOrigin);
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---------- PDO connection --------------------------------------------
function pdo(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $cfg = (require __DIR__ . '/config.php')['db'];
    $dsnParts = [
        "host={$cfg['host']}",
        "port={$cfg['port']}",
        "dbname={$cfg['dbname']}",
    ];
    if (!empty($cfg['sslmode'])) {
        $dsnParts[] = 'sslmode=' . $cfg['sslmode'];
    }
    $dsn = 'pgsql:' . implode(';', $dsnParts);
    try {
        $pdo = new PDO($dsn, $cfg['user'], $cfg['password'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        $payload = ['error' => 'Database connection failed'];
        if (!empty($config['debug'])) {
            $payload['detail'] = $e->getMessage();
        }
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
    return $pdo;
}

// ---------- Response helpers ------------------------------------------
function jsonOk($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function jsonErr(string $msg, int $code = 400, array $extra = []): void {
    http_response_code($code);
    echo json_encode(array_merge(['error' => $msg], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}

function readJsonBody(): array {
    $raw = file_get_contents('php://input');
    if ($raw === '' || $raw === false) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Postgres array literal (text[]) → PHP array.
 * Contoh: '{foo,"bar baz"}'  →  ['foo','bar baz']
 * Sederhana — cukup untuk konten string tanpa koma di dalamnya.
 */
function pgArray(?string $v): array {
    if ($v === null || $v === '' || $v === '{}') return [];
    $inner = substr($v, 1, -1);                  // strip kurung kurawal
    $parts = str_getcsv($inner, ',', '"', '\\');
    return array_map(fn($s) => (string)$s, $parts);
}

function requireAdmin(): void {
    $cfg = require __DIR__ . '/config.php';
    session_name($cfg['session_name']);
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (empty($_SESSION['admin_id'])) {
        jsonErr('Unauthorized', 401);
    }
}
