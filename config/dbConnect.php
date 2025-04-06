<?php
$host = 'localhost';
$dbname = 'perfect';
$username = 'root';
$pw = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8;", $username, $pw);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "<script>alert('데이터베이스 연결 오류 ". addslashes($e->getMessage())." ');</script>";
}

?>