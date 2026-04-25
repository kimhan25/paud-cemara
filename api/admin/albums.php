<?php
/**
 * CRUD album galeri.
 *
 * GET    /api/admin/albums.php
 * POST   /api/admin/albums.php            (JSON body)
 * PUT    /api/admin/albums.php?id=kelas
 * DELETE /api/admin/albums.php?id=kelas   (foto dalam album akan di-set album_id=NULL)
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
requireAdminSession();

$db     = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (string)$_GET['id'] : '';

function readAlbumInput(array $in): array {
    return [
        'sort_order' => (int)($in['sort_order'] ?? 0),
        'name_id'    => trim((string)($in['name_id'] ?? '')),
        'name_en'    => (string)($in['name_en'] ?? ''),
        'tone'       => (string)($in['tone']    ?? 'yellow'),
    ];
}

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM albums ORDER BY sort_order, id')->fetchAll();
    jsonOk(['albums' => $rows]);
}

if ($method === 'POST') {
    $in = readJsonBody();
    $newId = trim((string)($in['id'] ?? ''));
    if ($newId === '' || !preg_match('/^[a-z0-9-]{1,40}$/', $newId)) {
        jsonErr('id wajib & harus lowercase alphanumeric/dash', 422);
    }
    $f = readAlbumInput($in);
    if ($f['name_id'] === '') jsonErr('Nama (ID) wajib', 422);

    $stmt = $db->prepare(
        'INSERT INTO albums (id, sort_order, name_id, name_en, tone)
         VALUES (:id, :so, :ni, :ne, :tone) RETURNING *'
    );
    $stmt->execute([
        ':id' => $newId, ':so' => $f['sort_order'],
        ':ni' => $f['name_id'], ':ne' => $f['name_en'],
        ':tone' => $f['tone'],
    ]);
    jsonOk(['ok' => true, 'item' => $stmt->fetch()], 201);
}

if ($method === 'PUT') {
    if ($id === '') jsonErr('Param id wajib', 400);
    $in = readJsonBody();
    $f  = readAlbumInput($in);
    if ($f['name_id'] === '') jsonErr('Nama (ID) wajib', 422);

    $stmt = $db->prepare(
        'UPDATE albums SET sort_order=:so, name_id=:ni, name_en=:ne, tone=:tone
         WHERE id=:id RETURNING *'
    );
    $stmt->execute([
        ':id' => $id, ':so' => $f['sort_order'],
        ':ni' => $f['name_id'], ':ne' => $f['name_en'],
        ':tone' => $f['tone'],
    ]);
    $row = $stmt->fetch();
    if (!$row) jsonErr('Not found', 404);
    jsonOk(['ok' => true, 'item' => $row]);
}

if ($method === 'DELETE') {
    if ($id === '') jsonErr('Param id wajib', 400);
    // FK gallery_items.album_id sudah ON DELETE SET NULL — foto tidak ikut terhapus.
    pdo()->prepare('DELETE FROM albums WHERE id=:id')->execute([':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
