<?php
    session_start();
    error_reporting(0);
    if($_SESSION['usuario']){
        header("Location: index.php");
        exit;
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styles-login.css">
    <title>Iniciar Sesión</title>
</head>

<body>
    <div class="container">
        <form class="login-form" action="login-user.php" method="POST" id="login-form" data-type="login">
            <div class="buttons-log-reg">
                <div class="button-login button-active">LOGIN</div>
                <div class="button-register">REGISTER</div>
            </div>
            <h1 class="form-title">INICIA SESIÓN CON TU DNI:</h1>
            <input type="number" placeholder="DNI" name="nombre-usuario" required>
            <input type="submit" class="button" value="CONTINUAR">
        </form>
        
    </div>
    <script src="./js/app-login.js"></script>
</body>
</html>

