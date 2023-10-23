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
            $userCode = $user->crearUsuario( $dni );
            if( $userCode !== -1 ){
                session_start();
                $_SESSION['id'] = $userCode; 
                $_SESSION['usuario'] = $dni;
                $dataResponse['state'] = true;
                $dataResponse['message'] = 'Usuario Creado';
                echo json_encode($dataResponse);
            } else {
                $dataResponse['message'] = 'Usuario Ya Existe';
                echo json_encode($dataResponse);
            }
        }else{
            $dataResponse['message'] = 'Campos Vacios';
            echo json_encode($dataResponse);
        }
    }

    // require_once "Usuario.php";
    // $nombre_usuario = $_POST['nombre-usuario'];
    // $nombre_usuario = trim($nombre_usuario);
    // if($nombre_usuario!==null && $nombre_usuario!==""){
    //     //Crear Usuario en BD
    //     $usuario = new Usuario();
    //     $id = $usuario->crearUsuario($nombre_usuario);
    //     //Inicio de sesion 
    //     session_start();
    //     $_SESSION['id'] = $id;
    //     $_SESSION['usuario'] = $nombre_usuario;
    //     header("Location: index.php");
    //     exit;
    // }else{
    //     echo "Ingrese un nombre valido";
    // }
?>