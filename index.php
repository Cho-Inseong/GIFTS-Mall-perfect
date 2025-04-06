<?php
include('./config/dbConnect.php');

$request = $_SERVER['REQUEST_URI'];
$path = explode("?", $request);
$path[1] = isset($path[1]) ? $path[1] : null;
$resourse = explode("/", $path[0]);

$pages = '';
switch($resourse[1]) {
    case '':
        $pages = './pages/index.php';
        break;
    case 'introduce':
        $pages = './pages/introduce.php';
        break;
    case 'allProducts':
        $pages = './pages/allProducts.php';
        break;
    case 'popular':
        $pages = './pages/popular.php';
        break;
    case 'shoppingCart':
        $pages = './pages/shoppingCart.php';
        break;
    case 'sign_in':
        $pages = './pages/sign_in.php';
        break;
    case 'sign_up':
        $pages = './pages/sign_up.php';
        break;
    case 'admin':
        $pages = './pages/admin.php';
        break;
    default:
        echo '경로 잘못됨';
        exit;
}
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIFTS-Mall</title>
    <link rel="stylesheet" href="./[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/공통/bootstrap-4.3.1-dist/css/bootstrap.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <?php include("./pages/components/header.php")?>
    <?php include($pages)?>
    <?php include("./pages/components/footer.php")?>
    <script src="./[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/공통/jquery-3.4.1.min.js"></script>
    <script src="./[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/공통/bootstrap-4.3.1-dist/js/bootstrap.js"></script>
    <script src="./script.js"></script>
</body>
</html>