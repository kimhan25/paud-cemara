<?php
/**
 * Konfigurasi aplikasi.
 *
 * Urutan prioritas:
 * 1. default project
 * 2. `api/config.local.php` (override parsial per mesin)
 * 3. environment variable `PAUD_*` (override final / one-off)
 */

if (!function_exists('cfgEnvHas')) {
    function cfgEnvHas(string $key): bool
    {
        return getenv($key) !== false;
    }
}

if (!function_exists('cfgEnvValue')) {
    function cfgEnvValue(string $key, mixed $fallback): mixed
    {
        return cfgEnvHas($key) ? getenv($key) : $fallback;
    }
}

if (!function_exists('cfgEnvBool')) {
    function cfgEnvBool(string $key, bool $fallback): bool
    {
        if (!cfgEnvHas($key)) {
            return $fallback;
        }

        return in_array(
            strtolower((string)getenv($key)),
            ['1', 'true', 'yes', 'on'],
            true
        );
    }
}

$config = [
    'db' => [
        'host'     => 'localhost',
        'port'     => '5433',
        'dbname'   => 'paud_cemara',
        'user'     => 'postgres',
        'password' => '',
        'sslmode'  => '',
    ],

    // Origin yang diizinkan untuk CORS (boleh lebih dari satu, pisahkan
    // dengan koma). Kosong = same-origin only (default paling aman).
    'cors_origin' => '',

    // Debug mode: kalau aktif, detail error DB ikut dikirim di response.
    // Production sebaiknya biarkan OFF.
    'debug' => false,

    // Upload directory (path fisik ke folder public `/uploads`)
    'upload_dir'  => __DIR__ . '/../uploads',

    // Session cookie name
    'session_name' => 'paud_admin_sess',

    // Trust header reverse proxy seperti X-Forwarded-Proto / X-Forwarded-For.
    'trust_proxy' => false,

    // Paksa cookie session bertanda Secure walau PHP tidak langsung melihat HTTPS.
    'force_secure_session' => false,

    // Direktori file-based rate limit sederhana.
    'rate_limit_dir' => sys_get_temp_dir() . '/paud-cemara-rate-limit',
];

$localConfigPath = __DIR__ . '/config.local.php';
if (is_file($localConfigPath)) {
    $localConfig = require $localConfigPath;
    if (is_array($localConfig)) {
        $config = array_replace_recursive($config, $localConfig);
    }
}

$config['db']['host'] = (string)cfgEnvValue('PAUD_DB_HOST', $config['db']['host']);
$config['db']['port'] = (string)cfgEnvValue('PAUD_DB_PORT', $config['db']['port']);
$config['db']['dbname'] = (string)cfgEnvValue('PAUD_DB_NAME', $config['db']['dbname']);
$config['db']['user'] = (string)cfgEnvValue('PAUD_DB_USER', $config['db']['user']);
$config['db']['password'] = (string)cfgEnvValue('PAUD_DB_PASS', $config['db']['password']);
$config['db']['sslmode'] = (string)cfgEnvValue('PAUD_DB_SSLMODE', $config['db']['sslmode']);

$config['cors_origin'] = (string)cfgEnvValue('PAUD_CORS_ORIGIN', $config['cors_origin']);
$config['debug'] = cfgEnvBool('PAUD_DEBUG', (bool)$config['debug']);
$config['upload_dir'] = (string)cfgEnvValue('PAUD_UPLOAD_DIR', $config['upload_dir']);
$config['trust_proxy'] = cfgEnvBool('PAUD_TRUST_PROXY', (bool)$config['trust_proxy']);
$config['force_secure_session'] = cfgEnvBool('PAUD_SESSION_SECURE', (bool)$config['force_secure_session']);
$config['rate_limit_dir'] = (string)cfgEnvValue('PAUD_RATE_LIMIT_DIR', $config['rate_limit_dir']);

return $config;
