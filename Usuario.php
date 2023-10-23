<?php
    require_once "conexion.php";
    //clases de usuario para manipular sus registros con la bd
    class Usuario{
        private $pdo;

        public function __construct(){
            $this->pdo = $GLOBALS['pdo'];  
        }

        public function existsUserInDB( $dni ){
            $consulta = $this->pdo->prepare("SELECT * FROM usuarios WHERE nombre = :dni LIMIT 1");
            $consulta->bindParam(':dni', $dni, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);

        }

        public function crearUsuario( $dni ){
            $existsUser = count( $this->existsUserInDB( $dni ) );
            if($existsUser===1) return -1;
            $consulta = $this->pdo->prepare("INSERT INTO usuarios(nombre) VALUES (:dni)");
            $consulta->bindParam(':dni', $dni, PDO::PARAM_STR);
            $consulta->execute();
            return $this->pdo->lastInsertId();        
        }
        
        public function hizoFormulario( $id_usuario ){
            $consulta = $this->pdo->prepare("SELECT doQuiz, showAnswers FROM usuarios WHERE id_usuario = :id ");
            $consulta->bindParam(':id', $id_usuario, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }
        //Establecer la respuesta y el puntaje del usuario
        public function setResponseQuiz( $id_usuario, $doQuiz, $score ){
            $consulta = $this->pdo->prepare("UPDATE usuarios SET doQuiz = :doQuiz,  score = :score WHERE id_usuario = :id");
            $consulta->bindParam(':id', $id_usuario, PDO::PARAM_STR);
            $consulta->bindParam(':doQuiz', $doQuiz, PDO::PARAM_STR);
            $consulta->bindParam(':score', $score, PDO::PARAM_STR);
            return $consulta->execute();
        }

    }
?>