<?php 
    require_once "Imagen.php";
    require_once "Usuario.php";
    session_start();
    error_reporting(0);
    if(!$_SESSION['usuario']){
        header("Location: login.php");
        exit;
    }
    $resul = new Usuario();
    $arrayData = $resul->hizoFormulario($_SESSION['id']);
    $doQuiz = $arrayData[0]['doQuiz'];
    $showAnswers = $arrayData[0]['showAnswers'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styles_form.css">
    <link rel="icon" href="./web_imgs/ico_estrella.ico">
    <title>Quiz Game - Star</title>
</head>
<body>    
    <div class="logo">
        <a href="index.php"><img src="./web_imgs/logo_estrella.svg" id="logo-estrella"/></a>
    </div>
    
    <form action="" method="" class="contenedor-principal" id="contenedor-principal" data-do-Quiz="<?php echo $doQuiz ?>" data-show-answers="<?php echo $showAnswers ?>">
        <div class="message-box">
            DESLIZA <p class="message-arrow">&#8658</p>
        </div>
    </form>
    <img src="./web_imgs/gato.gif" class="gato">
    <script src="./js/app.js"></script>
</body>
</html>