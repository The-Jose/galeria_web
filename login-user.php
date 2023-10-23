<?php

require_once "Usuario.php";

if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['nombre-usuario'])){
    $dataResponse = array(
        'state' => false,
        'message' => ''
    );
    $dni = trim($_POST['nombre-usuario']);
    if( !is_numeric($dni) ){
        $dataResponse['message'] = 'No Es Un Número';
        echo json_encode($dataResponse);
        exit;
    }
    //PARA ENTRAR A CREAR USUARIO Y SESION
    if( $dni!==null && $dni!=="" ){
        $user = new Usuario();
        $existingUser = $user->existsUserInDB( $dni );
        if( count($existingUser)===1 ){
            $existsUser = $existingUser[0];
            session_start();
            $_SESSION['id'] = $existsUser['id_usuario']; 
            $_SESSION['usuario'] = $dni;
            $dataResponse['state'] = true;
            $dataResponse['message'] = 'Usuario Correcto';
            echo json_encode($dataResponse);
        } else {
            $dataResponse['message'] = 'Usuario NO Valido';
            echo json_encode($dataResponse);
        }
    }else{
        $dataResponse['message'] = 'Campos Vacios';
        echo json_encode($dataResponse);
    }
}

?>