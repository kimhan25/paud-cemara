<?php
/**
 * CRUD guru/staff.
 *
 * GET    /api/admin/teachers.php
 * POST   /api/admin/teachers.php             (JSON)
 * PUT    /api/admin/teachers.php?id=t1
 * DELETE /api/admin/teachers.php?id=t1
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
require __DIR__ . '/../_uploads.php';
requireAdminSession();

$db     = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (string)$_GET['id'] : '';

function readTeacherInput(array $in): array {
    return [
        'sort_order' => (int)($in['sort_order'] ?? 0),
        'name'       => trim((string)($in['name']    ?? '')),
        'role_id'    => (string)($in['role_id'] ?? ''),
        'role_en'    => (string)($in['role_en'] ?? ''),
        'tone'       => (string)($in['tone']    ?? 'yellow'),
        'photo_path' => ($in['photo_path'] ?? null) ?: null,
    ];
}

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM teachers ORDER BY sort_order, id')->fetchAll();
    jsonOk(['teachers' => $rows]);
}

if ($method === 'POST') {
    $in = readJsonBody();
    $newId = trim((string)($in['id'] ?? ''));
    if ($newId === '') $newId = 't' . substr(bin2hex(random_bytes(3)), 0, 6);
    $f = readTeacherInput($in);
    if ($f['name'] === '') jsonErr('Nama wajib', 422);

    $sql = 'INSERT INTO teachers (id, sort_order, name, role_id, role_en, tone, photo_path)
            VALUES (:id, :so, :nm, :ri, :re, :tone, :pp) RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $newId, ':so' => $f['sort_order'], ':nm' => $f['name'],
        ':ri' => $f['role_id'], ':re' => $f['role_en'],
        ':tone' => $f['tone'], ':pp' => $f['photo_path'],
    ]);
    jsonOk(['ok' => true, 'item' => $stmt->fetch()], 201);
}

if ($method === 'PUT') {
    if ($id === '') jsonErr('Param id wajib', 400);
    $in = readJsonBody();
    $f  = readTeacherInput($in);
    if ($f['name'] === '') jsonErr('Nama wajib', 422);

    $prevStmt = $db->prepare('SELECT photo_path FROM teachers WHERE id=:id');
    $prevStmt->execute([':id' => $id]);
    $prevRow = $prevStmt->fetch();
    if (!$prevRow) jsonErr('Not found', 404);

    $sql = 'UPDATE teachers SET sort_order=:so, name=:nm, role_id=:ri, role_en=:re,
                                tone=:tone, photo_path=:pp
            WHERE id=:id RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $id, ':so' => $f['sort_order'], ':nm' => $f['name'],
        ':ri' => $f['role_id'], ':re' => $f['role_en'],
        ':tone' => $f['tone'], ':pp' => $f['photo_path'],
    ]);
    $row = $stmt->fetch();
    if (!$row) jsonErr('Not found', 404);
    cleanupReplacedUpload($prevRow['photo_path'] ?? null, $row['photo_path'] ?? null);
    jsonOk(['ok' => true, 'item' => $row]);
}

if ($method === 'DELETE') {
    if ($id === '') jsonErr('Param id wajib', 400);

    $prevStmt = $db->prepare('SELECT photo_path FROM teachers WHERE id=:id');
    $prevStmt->execute([':id' => $id]);
    $prevRow = $prevStmt->fetch();

    pdo()->prepare('DELETE FROM teachers WHERE id=:id')->execute([':id' => $id]);
    deleteManagedUpload($prevRow['photo_path'] ?? null);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
