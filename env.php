<?php
// Simple lector de .env para proyectos sin frameworks
function env($key, $default = null)
{
    static $env = null;

    if ($env === null) {
        $env = [];
        $lines = file('.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($k, $v) = explode('=', $line, 2);
            $env[trim($k)] = trim($v);
        }
    }

    return $env[$key] ?? $default;
}
