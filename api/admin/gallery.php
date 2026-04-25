<?php
/**
 * Admin CRUD untuk galeri foto.
 *
 * GET    /api/admin/gallery.php             → list semua item galeri
 * POST   /api/admin/gallery.php             → create (JSON body)
 * PUT    /api/admin/gallery.php?id=N        → update
 * DELETE /api/admin/gallery.php?id=N        → hapus (dan hapus file fisik kalau ada)
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
require __DIR__ . '/../_uploads.php';
requireAdminSession();

$db     = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (int)$_GET['id'] : 0;

function rowToGallery(array $g): array {
    return [
        'id'         => (int)$g['id'],
        'album'      => $g['album_id'],
        'caption_id' => $g['caption_id'],
        'caption_en' => $g['caption_en'],
        'file_path'  => $g['file_path'],
        'w'          => (int)$g['w'],
        'h'          => (int)$g['h'],
        'tone'       => $g['tone'],
    ];
}

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM gallery_items ORDER BY sort_order, id')->fetchAll();
    jsonOk(['gallery' => array_map('rowToGallery', $rows)]);
}

if ($method === 'POST' || $method === 'PUT') {
    $in = readJsonBody();
    $fields = [
        'album_id'   => (string)($in['album']      ?? 'kelas'),
        'caption_id' => (string)($in['caption_id'] ?? ''),
        'caption_en' => (string)($in['caption_en'] ?? ''),
        'file_path'  => ($in['file_path'] ?? null) ?: null,
        'w'          => max(1, min(2, (int)($in['w'] ?? 1))),
        'h'          => max(1, min(2, (int)($in['h'] ?? 1))),
        'tone'       => (string)($in['tone']       ?? 'yellow'),
    ];

    if ($method === 'POST') {
        $sql = 'INSERT INTO gallery_items (album_id, caption_id, caption_en, file_path, w, h, tone)
                VALUES (:alb, :ci, :ce, :fp, :w, :h, :tone) RETURNING *';
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':alb' => $fields['album_id'],
            ':ci'  => $fields['caption_id'],
            ':ce'  => $fields['caption_en'],
            ':fp'  => $fields['file_path'],
            ':w'   => $fields['w'], ':h' => $fields['h'],
            ':tone' => $fields['tone'],
        ]);
        jsonOk(['ok' => true, 'item' => rowToGallery($stmt->fetch())], 201);
    }

    // PUT
    if ($id <= 0) jsonErr('Param id wajib', 400);
    $prevStmt = $db->prepare('SELECT file_path FROM gallery_items WHERE id = :id');
    $prevStmt->execute([':id' => $id]);
    $prevRow = $prevStmt->fetch();
    if (!$prevRow) jsonErr('Not found', 404);

    $sql = 'UPDATE gallery_items SET
                album_id=:alb, caption_id=:ci, caption_en=:ce, file_path=:fp,
                w=:w, h=:h, tone=:tone
            WHERE id=:id RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $id, ':alb' => $fields['album_id'],
        ':ci' => $fields['caption_id'], ':ce' => $fields['caption_en'],
        ':fp' => $fields['file_path'],
        ':w' => $fields['w'], ':h' => $fields['h'], ':tone' => $fields['tone'],
    ]);
    $row = $stmt->fetch();
    if (!$row) jsonErr('Not found', 404);
    cleanupReplacedUpload($prevRow['file_path'] ?? null, $row['file_path'] ?? null);
    jsonOk(['ok' => true, 'item' => rowToGallery($row)]);
}

if ($method === 'DELETE') {
    if ($id <= 0) jsonErr('Param id wajib', 400);

    // Ambil file_path dulu supaya bisa hapus file fisik
    $stmt = $db->prepare('SELECT file_path FROM gallery_items WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();

    $del = $db->prepare('DELETE FROM gallery_items WHERE id = :id');
    $del->execute([':id' => $id]);

    deleteManagedUpload($row['file_path'] ?? null);

    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
