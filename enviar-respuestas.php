<?php
    require_once "Usuario.php";
    //recibe datos del puntaje del usuario y los guarda
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        session_start();
        $id_usuario = $_SESSION['id'];
        $usuarioData = new Usuario();
        $usuarioData->setResponseQuiz($id_usuario, true, $_POST['score']);
        echo json_encode('ok');
    }else{
        header("Location: index.php");
    }

?>