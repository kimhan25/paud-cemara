<?php
/**
 * POST /api/contact.php
 *
 * Menerima submission form Kontak.
 * Body: { name, email, subject, message }
 */

require __DIR__ . '/db.php';
require __DIR__ . '/_rate_limit.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonErr('Method not allowed', 405);
}

$in = readJsonBody();

$name    = trim((string)($in['name']    ?? ''));
$email   = trim((string)($in['email']   ?? ''));
$subject = trim((string)($in['subject'] ?? ''));
$message = trim((string)($in['message'] ?? ''));
$website = trim((string)($in['website'] ?? ''));

enforceRateLimit('contact', 6, 10 * 60, 15 * 60);

if ($website !== '') {
    usleep(250_000);
    jsonOk(['ok' => true], 202);
}

// Validasi -------------------------------------------------------------
$errors = [];
if ($name === '' || mb_strlen($name) > 120)                  $errors['name']    = 'Nama wajib diisi (maks 120 karakter)';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))              $errors['email']   = 'Email tidak valid';
if (mb_strlen($message) < 10 || mb_strlen($message) > 2000)  $errors['message'] = 'Pesan 10–2000 karakter';
if (mb_strlen($subject) > 200)                               $errors['subject'] = 'Subjek maks 200 karakter';

if ($errors) jsonErr('Validation failed', 422, ['fields' => $errors]);

// Insert ---------------------------------------------------------------
$stmt = pdo()->prepare(
    'INSERT INTO messages (name, email, subject, body)
     VALUES (:n, :e, :s, :b)
     RETURNING id, created_at'
);
$stmt->execute([
    ':n' => $name,
    ':e' => $email,
    ':s' => $subject !== '' ? $subject : null,
    ':b' => $message,
]);
$row = $stmt->fetch();

jsonOk([
    'ok'         => true,
    'id'         => (int)$row['id'],
    'created_at' => $row['created_at'],
], 201);
