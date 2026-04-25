<?php
/**
 * Admin CRUD untuk berita.
 *
 * GET    /api/admin/news.php                → list semua
 * GET    /api/admin/news.php?id=xxx         → detail
 * POST   /api/admin/news.php                → create (JSON body)
 * PUT    /api/admin/news.php?id=xxx         → update (JSON body)
 * DELETE /api/admin/news.php?id=xxx         → hapus
 * POST   /api/admin/news.php?id=xxx&action=pin
 *        body: {pinned: true|false}         → toggle pin
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
require __DIR__ . '/../_uploads.php';
requireAdminSession();

$db     = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (string)$_GET['id'] : '';
$action = isset($_GET['action']) ? (string)$_GET['action'] : '';

/* ---------- helper: row → JSON shape --------------------------------- */
function rowToNews(array $n): array {
    return [
        'id'          => $n['id'],
        'slug'        => $n['slug'],
        'category_id' => $n['category_id'],
        'category_en' => $n['category_en'],
        'tone'        => $n['tone'],
        'pinned'      => (bool)$n['pinned'],
        'date'        => $n['publish_date'],
        'author'      => $n['author'],
        'title_id'    => $n['title_id'],
        'title_en'    => $n['title_en'],
        'excerpt_id'  => $n['excerpt_id'],
        'excerpt_en'  => $n['excerpt_en'],
        'body_id'     => pgArray($n['body_id']),
        'body_en'     => pgArray($n['body_en']),
        'cover_path'  => $n['cover_path'],
    ];
}

/* ---------- helper: build id, slug, paragraf ------------------------- */
function slugify(string $s): string {
    $s = strtolower($s);
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    return trim((string)$s, '-');
}

function paraArray($v): array {
    if (is_array($v)) return array_values(array_filter(array_map('trim', $v), fn($x) => $x !== ''));
    // String: pecah per blank-line
    $parts = preg_split('/\n\s*\n+/', (string)$v) ?: [];
    return array_values(array_filter(array_map('trim', $parts), fn($x) => $x !== ''));
}

/* ---------- LIST / DETAIL (GET) -------------------------------------- */
if ($method === 'GET') {
    if ($id !== '') {
        $stmt = $db->prepare('SELECT * FROM news WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        if (!$row) jsonErr('Not found', 404);
        jsonOk(['item' => rowToNews($row)]);
    }
    $rows = $db->query('SELECT * FROM news ORDER BY pinned DESC, publish_date DESC')->fetchAll();
    jsonOk(['news' => array_map('rowToNews', $rows)]);
}

/* ---------- TOGGLE PIN ----------------------------------------------- */
if ($method === 'POST' && $action === 'pin' && $id !== '') {
    $in = readJsonBody();
    $pin = !empty($in['pinned']);
    $stmt = $db->prepare('UPDATE news SET pinned = :p, updated_at = now() WHERE id = :id');
    $stmt->execute([':p' => $pin ? 't' : 'f', ':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id, 'pinned' => $pin]);
}

/* ---------- CREATE / UPDATE ------------------------------------------ */
if ($method === 'POST' || $method === 'PUT') {
    $in = readJsonBody();

    $title_id = trim((string)($in['title_id'] ?? ''));
    if ($title_id === '') jsonErr('title_id wajib', 422);

    $fields = [
        'slug'         => ($in['slug'] ?? '') ?: slugify($title_id),
        'category_id'  => (string)($in['category_id']  ?? 'Pengumuman'),
        'category_en'  => (string)($in['category_en']  ?? 'Announcement'),
        'tone'         => (string)($in['tone']         ?? 'yellow'),
        'pinned'       => !empty($in['pinned']),
        'publish_date' => ($in['date'] ?? $in['publish_date'] ?? null) ?: date('Y-m-d'),
        'author'       => (string)($in['author']       ?? 'Tim Admin'),
        'title_id'     => $title_id,
        'title_en'     => (string)($in['title_en']     ?? ''),
        'excerpt_id'   => (string)($in['excerpt_id']   ?? ''),
        'excerpt_en'   => (string)($in['excerpt_en']   ?? ''),
        'cover_path'   => ($in['cover_path'] ?? null) ?: null,
    ];
    $body_id = paraArray($in['body_id'] ?? []);
    $body_en = paraArray($in['body_en'] ?? []);

    if ($method === 'POST') {
        // CREATE
        $newId = (string)($in['id'] ?? '') ?: ('n' . substr(bin2hex(random_bytes(4)), 0, 8));

        // Pastikan slug unik
        $slug = $fields['slug'];
        $chk = $db->prepare('SELECT 1 FROM news WHERE slug = :s');
        $chk->execute([':s' => $slug]);
        if ($chk->fetch()) $slug .= '-' . substr(bin2hex(random_bytes(2)), 0, 4);

        $sql = 'INSERT INTO news (id, slug, category_id, category_en, tone, pinned, publish_date, author,
                    title_id, title_en, excerpt_id, excerpt_en, body_id, body_en, cover_path)
                VALUES (:id, :slug, :ci, :ce, :tone, :pinned, :date, :author,
                        :ti, :te, :ei, :ee, :bi, :be, :cp)
                RETURNING *';
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':id' => $newId, ':slug' => $slug,
            ':ci' => $fields['category_id'], ':ce' => $fields['category_en'],
            ':tone' => $fields['tone'], ':pinned' => $fields['pinned'] ? 't' : 'f',
            ':date' => $fields['publish_date'], ':author' => $fields['author'],
            ':ti' => $fields['title_id'], ':te' => $fields['title_en'],
            ':ei' => $fields['excerpt_id'], ':ee' => $fields['excerpt_en'],
            ':bi' => '{' . implode(',', array_map(fn($x) => '"' . str_replace(['\\','"'], ['\\\\','\\"'], $x) . '"', $body_id)) . '}',
            ':be' => '{' . implode(',', array_map(fn($x) => '"' . str_replace(['\\','"'], ['\\\\','\\"'], $x) . '"', $body_en)) . '}',
            ':cp' => $fields['cover_path'],
        ]);
        jsonOk(['ok' => true, 'item' => rowToNews($stmt->fetch())], 201);
    }

    // UPDATE (PUT)
    if ($id === '') jsonErr('Param id wajib untuk update', 400);
    $prevStmt = $db->prepare('SELECT cover_path FROM news WHERE id = :id LIMIT 1');
    $prevStmt->execute([':id' => $id]);
    $prevRow = $prevStmt->fetch();
    if (!$prevRow) jsonErr('Not found', 404);

    $sql = 'UPDATE news SET
                slug=:slug, category_id=:ci, category_en=:ce, tone=:tone,
                pinned=:pinned, publish_date=:date, author=:author,
                title_id=:ti, title_en=:te, excerpt_id=:ei, excerpt_en=:ee,
                body_id=:bi, body_en=:be, cover_path=:cp, updated_at=now()
            WHERE id=:id RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $id, ':slug' => $fields['slug'],
        ':ci' => $fields['category_id'], ':ce' => $fields['category_en'],
        ':tone' => $fields['tone'], ':pinned' => $fields['pinned'] ? 't' : 'f',
        ':date' => $fields['publish_date'], ':author' => $fields['author'],
        ':ti' => $fields['title_id'], ':te' => $fields['title_en'],
        ':ei' => $fields['excerpt_id'], ':ee' => $fields['excerpt_en'],
        ':bi' => '{' . implode(',', array_map(fn($x) => '"' . str_replace(['\\','"'], ['\\\\','\\"'], $x) . '"', $body_id)) . '}',
        ':be' => '{' . implode(',', array_map(fn($x) => '"' . str_replace(['\\','"'], ['\\\\','\\"'], $x) . '"', $body_en)) . '}',
        ':cp' => $fields['cover_path'],
    ]);
    $row = $stmt->fetch();
    if (!$row) jsonErr('Not found', 404);
    cleanupReplacedUpload($prevRow['cover_path'] ?? null, $row['cover_path'] ?? null);
    jsonOk(['ok' => true, 'item' => rowToNews($row)]);
}

/* ---------- DELETE --------------------------------------------------- */
if ($method === 'DELETE') {
    if ($id === '') jsonErr('Param id wajib', 400);

    $prevStmt = $db->prepare('SELECT cover_path FROM news WHERE id = :id LIMIT 1');
    $prevStmt->execute([':id' => $id]);
    $prevRow = $prevStmt->fetch();

    $stmt = $db->prepare('DELETE FROM news WHERE id = :id');
    $stmt->execute([':id' => $id]);
    deleteManagedUpload($prevRow['cover_path'] ?? null);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
