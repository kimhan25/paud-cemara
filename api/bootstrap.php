<?php
/**
 * GET /api/bootstrap.php
 *
 * Aggregate endpoint: kembalikan seluruh data yang dibutuhkan frontend
 * dalam SATU kali fetch. Bentuk response match dengan `window.SEED` lama,
 * supaya minim perubahan di JSX.
 */

require __DIR__ . '/db.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    jsonErr('Method not allowed', 405);
}

$db = pdo();

// ---------- Settings ---------------------------------------------------
$settingsRow = $db->query('SELECT * FROM settings WHERE id = 1 LIMIT 1')->fetch();
$settings = $settingsRow ? [
    'schoolName' => $settingsRow['school_name'],
    'tagline_id' => $settingsRow['tagline_id'],
    'tagline_en' => $settingsRow['tagline_en'],
    'address'    => $settingsRow['address'],
    'phone'      => $settingsRow['phone'],
    'whatsapp'   => $settingsRow['whatsapp'],
    'email'      => $settingsRow['email'],
    'hours_id'   => $settingsRow['hours_id'],
    'hours_en'   => $settingsRow['hours_en'],
    'logo_path'  => $settingsRow['logo_path'],
    'maps_embed_url' => $settingsRow['maps_embed_url'],
] : null;

// ---------- Hero stats -------------------------------------------------
$stats = $db->query('SELECT k, n, label_id, label_en FROM hero_stats ORDER BY sort_order')->fetchAll();

// ---------- Programs ---------------------------------------------------
$programsRaw = $db->query('SELECT * FROM programs ORDER BY sort_order')->fetchAll();
$programs = array_map(function ($p) {
    return [
        'id'         => $p['id'],
        'age_id'     => $p['age_id'],
        'age_en'     => $p['age_en'],
        'title_id'   => $p['title_id'],
        'title_en'   => $p['title_en'],
        'tone'       => $p['tone'],
        'hours_id'   => $p['hours_id'],
        'hours_en'   => $p['hours_en'],
        'desc_id'    => $p['desc_id'],
        'desc_en'    => $p['desc_en'],
        'pillars_id' => pgArray($p['pillars_id']),
        'pillars_en' => pgArray($p['pillars_en']),
    ];
}, $programsRaw);

// ---------- Albums (dengan "Semua" di depan) --------------------------
$albumsDb = $db->query('SELECT id, name_id, name_en, tone FROM albums ORDER BY sort_order')->fetchAll();
$albums = array_merge(
    [['id' => 'all', 'name_id' => 'Semua', 'name_en' => 'All']],
    $albumsDb
);

// ---------- Gallery ----------------------------------------------------
$galleryRaw = $db->query('SELECT * FROM gallery_items ORDER BY sort_order, id')->fetchAll();
$gallery = array_map(function ($g) {
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
}, $galleryRaw);

// ---------- News -------------------------------------------------------
$newsRaw = $db->query(
    'SELECT * FROM news ORDER BY pinned DESC, publish_date DESC'
)->fetchAll();
$news = array_map(function ($n) {
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
}, $newsRaw);

// ---------- Teachers ---------------------------------------------------
$teachers = $db->query(
    'SELECT id, name, role_id, role_en, tone, photo_path FROM teachers ORDER BY sort_order'
)->fetchAll();

// ---------- Facilities -------------------------------------------------
$facilitiesRaw = $db->query(
    'SELECT tone, text_id AS "id", text_en AS "en" FROM facilities ORDER BY sort_order'
)->fetchAll();

// ---------- History ----------------------------------------------------
$historyRaw = $db->query(
    'SELECT year, text_id AS "id", text_en AS "en" FROM history_entries ORDER BY sort_order'
)->fetchAll();

// ---------- Fees -------------------------------------------------------
$feesRaw = $db->query(
    'SELECT label_id, label_en, amount, once FROM fees ORDER BY sort_order'
)->fetchAll();
$fees = array_map(fn($f) => [
    'label_id' => $f['label_id'],
    'label_en' => $f['label_en'],
    'amount'   => (int)$f['amount'],
    'once'     => (bool)$f['once'],
], $feesRaw);

// ---------- Day schedule ----------------------------------------------
$dayScheduleRaw = $db->query(
    'SELECT time_label AS "time", tone, text_id AS "id", text_en AS "en" FROM day_schedule ORDER BY sort_order'
)->fetchAll();

// ---------- Messages (untuk demo di inbox admin — publik hanya kosong) -
// Messages sebaiknya tidak dipublish ke frontend publik; kita kirim array
// kosong di sini. Admin page akan fetch sendiri dari /api/messages.php.
$messages = [];

jsonOk([
    'settings'    => $settings,
    'stats'       => $stats,
    'programs'    => $programs,
    'albums'      => $albums,
    'gallery'     => $gallery,
    'news'        => $news,
    'teachers'    => $teachers,
    'facilities'  => $facilitiesRaw,
    'history'     => $historyRaw,
    'fees'        => $fees,
    'daySchedule' => $dayScheduleRaw,
    'messages'    => $messages,
]);
