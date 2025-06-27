<?php
require_once 'env.php';

$token = $_GET['token'] ?? '';
$expected = env('PRIVATE_VIEWER_TOKEN');

if ($token !== $expected) {
    http_response_code(403);
    echo "Acceso denegado";
    exit;
}

// contador igual que antes
$file = 'viewers.json';
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$now = time();
$timeout = 120;

$active = 0;
foreach ($data as $timestamp) {
    if ($timestamp >= $now - $timeout) {
        $active++;
    }
}

echo "Usuarios viendo desde radiomapache: $active";
