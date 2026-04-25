<?php
/**
 * POST /api/ppdb.php
 *
 * Menerima pendaftaran PPDB.
 * Body: { childName, childDob, level, parentName, parentPhone,
 *         parentEmail, address, notes, source }
 */

require __DIR__ . '/db.php';
require __DIR__ . '/_rate_limit.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonErr('Method not allowed', 405);
}

$in = readJsonBody();

$childName   = trim((string)($in['childName']   ?? ''));
$childDob    = trim((string)($in['childDob']    ?? ''));
$level       = trim((string)($in['level']       ?? ''));
$parentName  = trim((string)($in['parentName']  ?? ''));
$parentPhone = trim((string)($in['parentPhone'] ?? ''));
$parentEmail = trim((string)($in['parentEmail'] ?? ''));
$address     = trim((string)($in['address']     ?? ''));
$notes       = trim((string)($in['notes']       ?? ''));
$source      = trim((string)($in['source']      ?? ''));
$website     = trim((string)($in['website']     ?? ''));

enforceRateLimit('ppdb', 4, 30 * 60, 60 * 60);

if ($website !== '') {
    usleep(250_000);
    jsonOk(['ok' => true], 202);
}

// Validasi -------------------------------------------------------------
$errors = [];
if ($childName === '')                                        $errors['childName']   = 'Nama anak wajib';
if ($childDob === '' || !strtotime($childDob))                $errors['childDob']    = 'Tanggal lahir tidak valid';
if (!in_array($level, ['kb','tk-a','tk-b'], true))            $errors['level']       = 'Jenjang tidak valid';
if ($parentName === '')                                       $errors['parentName']  = 'Nama orang tua wajib';
if (!preg_match('/^[\d\s+\-()]{8,}$/', $parentPhone))         $errors['parentPhone'] = 'Telepon tidak valid';
if (!filter_var($parentEmail, FILTER_VALIDATE_EMAIL))         $errors['parentEmail'] = 'Email tidak valid';

if ($errors) jsonErr('Validation failed', 422, ['fields' => $errors]);

// Insert ---------------------------------------------------------------
$notesCombined = $notes;
if ($source !== '') {
    $notesCombined = trim($notes . "\n[source] " . $source);
}

$stmt = pdo()->prepare(
    'INSERT INTO registrations
         (child_name, child_dob, level, parent_name, parent_email, parent_phone, parent_address, notes)
     VALUES (:cn, :cd, :lv, :pn, :pe, :pp, :pa, :nt)
     RETURNING id, created_at'
);
$stmt->execute([
    ':cn' => $childName,
    ':cd' => $childDob,
    ':lv' => $level,
    ':pn' => $parentName,
    ':pe' => $parentEmail,
    ':pp' => $parentPhone,
    ':pa' => $address !== '' ? $address : null,
    ':nt' => $notesCombined !== '' ? $notesCombined : null,
]);
$row = $stmt->fetch();

jsonOk([
    'ok'             => true,
    'id'             => (int)$row['id'],
    'application_no' => sprintf('CMR-%06d', (int)$row['id']),
    'created_at'     => $row['created_at'],
], 201);
