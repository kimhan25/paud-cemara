<?php
/**
 * Contoh override lokal / production.
 * Copy menjadi `config.local.php` lalu ubah nilai yang dibutuhkan saja.
 * File ini bersifat override parsial; key yang tidak diisi akan memakai default project.
 */

return [
    'db' => [
        'host'     => 'localhost',
        'port'     => '5432',
        'dbname'   => 'paud_cemara',
        'user'     => 'postgres',
        'password' => '',
        'sslmode'  => '',
    ],

    'cors_origin' => '',
    'debug' => true,
    // Harus menunjuk ke folder public `uploads/` yang benar-benar dilayani web server.
    'upload_dir' => __DIR__ . '/../uploads',
    'session_name' => 'paud_admin_sess',
    'trust_proxy' => false,
    'force_secure_session' => false,
    'rate_limit_dir' => sys_get_temp_dir() . '/paud-cemara-rate-limit',
];
