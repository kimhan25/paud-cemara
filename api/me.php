<?php
/**
 * GET /api/me.php — kembalikan info admin yang login, atau null.
 */

require __DIR__ . '/db.php';
require __DIR__ . '/_session.php';

$admin = currentAdmin();
jsonOk(['user' => $admin]);
