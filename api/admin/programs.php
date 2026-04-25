<?php
/**
 * CRUD program (jenjang).
 *
 * GET    /api/admin/programs.php
 * POST   /api/admin/programs.php          (JSON body)
 * PUT    /api/admin/programs.php?id=kb
 * DELETE /api/admin/programs.php?id=kb
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
requireAdminSession();

$db     = pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id     = isset($_GET['id']) ? (string)$_GET['id'] : '';

function pgArrayLit(array $items): string {
    return '{' . implode(',', array_map(fn($x) => '"' . str_replace(['\\','"'], ['\\\\','\\"'], $x) . '"', $items)) . '}';
}

function rowToProgram(array $p): array {
    return [
        'id'         => $p['id'],
        'sort_order' => (int)$p['sort_order'],
        'age_id'     => $p['age_id'],   'age_en'   => $p['age_en'],
        'title_id'   => $p['title_id'], 'title_en' => $p['title_en'],
        'tone'       => $p['tone'],
        'hours_id'   => $p['hours_id'], 'hours_en' => $p['hours_en'],
        'desc_id'    => $p['desc_id'],  'desc_en'  => $p['desc_en'],
        'pillars_id' => pgArray($p['pillars_id']),
        'pillars_en' => pgArray($p['pillars_en']),
    ];
}

function readProgramInput(array $in): array {
    $pillars_id = $in['pillars_id'] ?? [];
    $pillars_en = $in['pillars_en'] ?? [];
    if (is_string($pillars_id)) $pillars_id = array_values(array_filter(array_map('trim', explode("\n", $pillars_id))));
    if (is_string($pillars_en)) $pillars_en = array_values(array_filter(array_map('trim', explode("\n", $pillars_en))));
    return [
        'sort_order' => (int)($in['sort_order'] ?? 0),
        'age_id'     => (string)($in['age_id']    ?? ''),
        'age_en'     => (string)($in['age_en']    ?? ''),
        'title_id'   => (string)($in['title_id']  ?? ''),
        'title_en'   => (string)($in['title_en']  ?? ''),
        'tone'       => (string)($in['tone']      ?? 'yellow'),
        'hours_id'   => (string)($in['hours_id']  ?? ''),
        'hours_en'   => (string)($in['hours_en']  ?? ''),
        'desc_id'    => (string)($in['desc_id']   ?? ''),
        'desc_en'    => (string)($in['desc_en']   ?? ''),
        'pillars_id' => array_values((array)$pillars_id),
        'pillars_en' => array_values((array)$pillars_en),
    ];
}

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM programs ORDER BY sort_order, id')->fetchAll();
    jsonOk(['programs' => array_map('rowToProgram', $rows)]);
}

if ($method === 'POST') {
    $in = readJsonBody();
    $newId = trim((string)($in['id'] ?? ''));
    if ($newId === '') jsonErr('Field id wajib (mis. kb, tk-a)', 422);
    if (!preg_match('/^[a-z0-9-]{1,40}$/', $newId)) jsonErr('id harus lowercase alphanumeric/dash', 422);

    $f = readProgramInput($in);
    if ($f['title_id'] === '') jsonErr('title_id wajib', 422);

    $sql = 'INSERT INTO programs (id, sort_order, age_id, age_en, title_id, title_en, tone,
                hours_id, hours_en, desc_id, desc_en, pillars_id, pillars_en)
            VALUES (:id, :so, :ai, :ae, :ti, :te, :tone, :hi, :he, :di, :de, :pi, :pe)
            RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $newId, ':so' => $f['sort_order'],
        ':ai' => $f['age_id'], ':ae' => $f['age_en'],
        ':ti' => $f['title_id'], ':te' => $f['title_en'], ':tone' => $f['tone'],
        ':hi' => $f['hours_id'], ':he' => $f['hours_en'],
        ':di' => $f['desc_id'], ':de' => $f['desc_en'],
        ':pi' => pgArrayLit($f['pillars_id']),
        ':pe' => pgArrayLit($f['pillars_en']),
    ]);
    jsonOk(['ok' => true, 'item' => rowToProgram($stmt->fetch())], 201);
}

if ($method === 'PUT') {
    if ($id === '') jsonErr('Param id wajib', 400);
    $in = readJsonBody();
    $f  = readProgramInput($in);
    if ($f['title_id'] === '') jsonErr('title_id wajib', 422);

    $sql = 'UPDATE programs SET
                sort_order=:so, age_id=:ai, age_en=:ae, title_id=:ti, title_en=:te,
                tone=:tone, hours_id=:hi, hours_en=:he, desc_id=:di, desc_en=:de,
                pillars_id=:pi, pillars_en=:pe
            WHERE id=:id RETURNING *';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':id' => $id, ':so' => $f['sort_order'],
        ':ai' => $f['age_id'], ':ae' => $f['age_en'],
        ':ti' => $f['title_id'], ':te' => $f['title_en'], ':tone' => $f['tone'],
        ':hi' => $f['hours_id'], ':he' => $f['hours_en'],
        ':di' => $f['desc_id'], ':de' => $f['desc_en'],
        ':pi' => pgArrayLit($f['pillars_id']),
        ':pe' => pgArrayLit($f['pillars_en']),
    ]);
    $row = $stmt->fetch();
    if (!$row) jsonErr('Not found', 404);
    jsonOk(['ok' => true, 'item' => rowToProgram($row)]);
}

if ($method === 'DELETE') {
    if ($id === '') jsonErr('Param id wajib', 400);
    pdo()->prepare('DELETE FROM programs WHERE id=:id')->execute([':id' => $id]);
    jsonOk(['ok' => true, 'id' => $id]);
}

jsonErr('Method not allowed', 405);
