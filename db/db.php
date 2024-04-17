<?php
$server = "localhost";
$username = "admin";
$password = "";
$database = "webscript";

$conn = mysqli_connect($server, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}