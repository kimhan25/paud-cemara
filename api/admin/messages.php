<?php
/**
 * GET  /api/admin/messages.php           → list pesan
 * POST /api/admin/messages.php?id=N      → mark read (body: {read:true|false})
 * DELETE /api/admin/messages.php?id=N    → hapus pesan
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
requireAdminSession();

$db = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($method === 'GET') {
    $rows = $db->query(
        'SELECT id, name, email, subject, body, read_at, created_at
           FROM messages
          ORDER BY created_at DESC'
    )->fetchAll();

    $out = array_map(function ($m) {
        $body = (string)$m['body'];
        return [
            'id'         => (int)$m['id'],
            'name'       => $m['name'],
            'email'      => $m['email'],
            'subject_id' => $m['subject'] ?: '(Tanpa subjek)',
            'subject_en' => $m['subject'] ?: '(No subject)',
            'preview_id' => mb_substr($body, 0, 160),
            'preview_en' => mb_substr($body, 0, 160),
            'body'       => $body,
            'date'       => substr((string)$m['created_at'], 0, 10),
            'unread'     => $m['read_at'] === null,
            'created_at' => $m['created_at'],
        ];
    }, $rows);
    jsonOk(['messages' => $out]);
}

if ($id <= 0) jsonErr('Param id wajib', 400);

if ($method === 'POST') {
    $in = readJsonBody();
    $read = !empty($in['read']);
    $sql = $read
        ? 'UPDATE messages SET read_at = now() WHERE id = :id'
        : 'UPDATE messages SET read_at = NULL   WHERE id = :id';
    pdo()->prepare($sql)->execute([':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id, 'read' => $read]);
}

if ($method === 'DELETE') {
    pdo()->prepare('DELETE FROM messages WHERE id = :id')->execute([':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
