<?php
/**
 * Admin settings.
 *
 * GET  /api/admin/settings.php         → ambil settings (sama dengan public)
 * PUT  /api/admin/settings.php         → update (JSON body)
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
require __DIR__ . '/../_uploads.php';
requireAdminSession();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $row = pdo()->query('SELECT * FROM settings WHERE id = 1 LIMIT 1')->fetch();
    if (!$row) jsonOk(['settings' => null]);
    jsonOk(['settings' => [
        'schoolName' => $row['school_name'],
        'tagline_id' => $row['tagline_id'],
        'tagline_en' => $row['tagline_en'],
        'address'    => $row['address'],
        'phone'      => $row['phone'],
        'whatsapp'   => $row['whatsapp'],
        'email'      => $row['email'],
        'hours_id'   => $row['hours_id'],
        'hours_en'   => $row['hours_en'],
        'logo_path'  => $row['logo_path'],
        'map_lat'    => ($row['map_lat'] ?? null) !== null ? (float)$row['map_lat'] : null,
        'map_lng'    => ($row['map_lng'] ?? null) !== null ? (float)$row['map_lng'] : null,
        'map_zoom'   => ($row['map_zoom'] ?? null) !== null ? (int)$row['map_zoom'] : null,
        'maps_embed_url' => $row['maps_embed_url'],
    ]]);
}

if ($method === 'PUT' || $method === 'POST') {
    $in = readJsonBody();
    $prevRow = pdo()->query('SELECT logo_path FROM settings WHERE id = 1 LIMIT 1')->fetch() ?: null;
    $rawMapLat = trim((string)($in['map_lat'] ?? ''));
    $rawMapLng = trim((string)($in['map_lng'] ?? ''));
    $rawMapZoom = trim((string)($in['map_zoom'] ?? ''));

    $fields = [
        'school_name'   => trim((string)($in['schoolName']     ?? 'PAUD Cemara')),
        'tagline_id'    => (string)($in['tagline_id']          ?? ''),
        'tagline_en'    => (string)($in['tagline_en']          ?? ''),
        'address'       => (string)($in['address']             ?? ''),
        'phone'         => (string)($in['phone']               ?? ''),
        'whatsapp'      => preg_replace('/\D/', '', (string)($in['whatsapp'] ?? '')),
        'email'         => (string)($in['email']               ?? ''),
        'hours_id'      => (string)($in['hours_id']            ?? ''),
        'hours_en'      => (string)($in['hours_en']            ?? ''),
        'logo_path'     => ($in['logo_path']      ?? null) ?: null,
        'map_lat'       => $rawMapLat === '' ? null : (float)$rawMapLat,
        'map_lng'       => $rawMapLng === '' ? null : (float)$rawMapLng,
        'map_zoom'      => $rawMapZoom === '' ? 16 : (int)$rawMapZoom,
        'maps_embed_url'=> ($in['maps_embed_url'] ?? null) ?: null,
    ];

    if ($fields['school_name'] === '') jsonErr('Nama sekolah wajib', 422);
    if ($fields['email'] !== '' && !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
        jsonErr('Email tidak valid', 422);
    }
    if (($rawMapLat === '') xor ($rawMapLng === '')) {
        jsonErr('Latitude dan longitude harus diisi berpasangan', 422);
    }
    if ($fields['map_lat'] !== null && ($fields['map_lat'] < -90 || $fields['map_lat'] > 90)) {
        jsonErr('Latitude tidak valid', 422);
    }
    if ($fields['map_lng'] !== null && ($fields['map_lng'] < -180 || $fields['map_lng'] > 180)) {
        jsonErr('Longitude tidak valid', 422);
    }
    if ($fields['map_zoom'] < 1 || $fields['map_zoom'] > 20) {
        jsonErr('Zoom peta harus antara 1 sampai 20', 422);
    }

    $sql = 'INSERT INTO settings
              (id, school_name, tagline_id, tagline_en, address, phone, whatsapp, email,
               hours_id, hours_en, logo_path, map_lat, map_lng, map_zoom, maps_embed_url)
            VALUES
              (1, :name, :ti, :te, :addr, :ph, :wa, :em, :hi, :he, :logo, :map_lat, :map_lng, :map_zoom, :maps)
            ON CONFLICT (id) DO UPDATE SET
              school_name=EXCLUDED.school_name, tagline_id=EXCLUDED.tagline_id, tagline_en=EXCLUDED.tagline_en,
              address=EXCLUDED.address, phone=EXCLUDED.phone, whatsapp=EXCLUDED.whatsapp, email=EXCLUDED.email,
              hours_id=EXCLUDED.hours_id, hours_en=EXCLUDED.hours_en,
              logo_path=EXCLUDED.logo_path, map_lat=EXCLUDED.map_lat, map_lng=EXCLUDED.map_lng,
              map_zoom=EXCLUDED.map_zoom, maps_embed_url=EXCLUDED.maps_embed_url';
    $stmt = pdo()->prepare($sql);
    $stmt->execute([
        ':name' => $fields['school_name'],
        ':ti'   => $fields['tagline_id'], ':te' => $fields['tagline_en'],
        ':addr' => $fields['address'], ':ph' => $fields['phone'],
        ':wa'   => $fields['whatsapp'], ':em' => $fields['email'],
        ':hi'   => $fields['hours_id'], ':he' => $fields['hours_en'],
        ':logo' => $fields['logo_path'],
        ':map_lat' => $fields['map_lat'],
        ':map_lng' => $fields['map_lng'],
        ':map_zoom' => $fields['map_zoom'],
        ':maps' => $fields['maps_embed_url'],
    ]);
    cleanupReplacedUpload($prevRow['logo_path'] ?? null, $fields['logo_path']);
    jsonOk(['ok' => true]);
}

jsonErr('Method not allowed', 405);
