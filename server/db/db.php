<?php
require_once 'config.php';

$conn = mysqli_connect($_ENV['DB_SERVER'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_DATABASE']);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}