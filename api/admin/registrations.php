<?php
/**
 * GET    /api/admin/registrations.php           → list pendaftar
 * POST   /api/admin/registrations.php?id=N      → update status ({status: baru|diproses|diterima|ditolak})
 * DELETE /api/admin/registrations.php?id=N      → hapus
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
requireAdminSession();

$db = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($method === 'GET') {
    $rows = $db->query(
        'SELECT * FROM registrations ORDER BY created_at DESC'
    )->fetchAll();
    foreach ($rows as &$r) {
        $r['id']              = (int)$r['id'];
        $r['application_no']  = sprintf('CMR-%06d', (int)$r['id']);
    }
    jsonOk(['registrations' => $rows]);
}

if ($id <= 0) jsonErr('Param id wajib', 400);

if ($method === 'POST') {
    $in = readJsonBody();
    $status = (string)($in['status'] ?? '');
    if (!in_array($status, ['baru','diproses','diterima','ditolak'], true)) {
        jsonErr('Status tidak valid', 422);
    }
    pdo()->prepare('UPDATE registrations SET status=:s WHERE id=:id')
         ->execute([':s' => $status, ':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id, 'status' => $status]);
}

if ($method === 'DELETE') {
    pdo()->prepare('DELETE FROM registrations WHERE id=:id')->execute([':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
