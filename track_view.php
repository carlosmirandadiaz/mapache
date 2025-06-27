<?php
$data = json_decode(file_get_contents('php://input'), true);
$viewerId = $data['id'] ?? null;

if (!$viewerId) {
    http_response_code(400);
    exit('No viewer ID provided.');
}

$file = 'viewers.json';
$now = time();
$timeout = 120; // segundos para considerar "activo"

$viewers = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Registrar o actualizar visitante
$viewers[$viewerId] = $now;

// Limpiar visitantes antiguos
foreach ($viewers as $id => $timestamp) {
    if ($timestamp < $now - $timeout) {
        unset($viewers[$id]);
    }
}

// Guardar
file_put_contents($file, json_encode($viewers));
http_response_code(204);
