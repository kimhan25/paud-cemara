<?php
/**
 * GET /api/admin/stats.php  — counts untuk dashboard admin.
 */

require __DIR__ . '/../db.php';
require __DIR__ . '/../_session.php';
requireAdminSession();

$db = pdo();

$news      = (int)$db->query('SELECT COUNT(*) FROM news')->fetchColumn();
$gallery   = (int)$db->query('SELECT COUNT(*) FROM gallery_items')->fetchColumn();
$msgNew    = (int)$db->query('SELECT COUNT(*) FROM messages WHERE read_at IS NULL')->fetchColumn();
$msgTotal  = (int)$db->query('SELECT COUNT(*) FROM messages')->fetchColumn();
$regNew    = (int)$db->query("SELECT COUNT(*) FROM registrations WHERE status = 'baru'")->fetchColumn();
$regTotal  = (int)$db->query('SELECT COUNT(*) FROM registrations')->fetchColumn();
$pinned    = (int)$db->query('SELECT COUNT(*) FROM news WHERE pinned')->fetchColumn();

jsonOk([
    'news'            => $news,
    'news_pinned'     => $pinned,
    'gallery'         => $gallery,
    'messages_new'    => $msgNew,
    'messages_total'  => $msgTotal,
    'ppdb_new'        => $regNew,
    'ppdb_total'      => $regTotal,
]);
