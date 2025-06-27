<?php
$ip = $_SERVER['REMOTE_ADDR'];
$file = 'viewers.json';
$now = time();
$timeout = 120; // 2 minutos

$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$data[$ip] = $now;

foreach ($data as $k => $v) {
    if ($v < $now - $timeout) {
        unset($data[$k]);
    }
}

file_put_contents($file, json_encode($data));

http_response_code(204);
