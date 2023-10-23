<?php
    require_once "conexion.php";
    //Clase con metodos para manipular las imagenes
    class Imagen{
        private $pdo;

        public function __construct(){
            $this->pdo = $GLOBALS['pdo'];          
        }

        public function obtenerImagenes(){
            $consulta = $this->pdo->query("SELECT * FROM imagenes ORDER BY id_imagen DESC");
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        }

        public function agregarImagen($rutaImagen, $id_usuario){
            $consulta = $this->pdo->prepare("INSERT INTO imagenes(rutaImagen, id_usuario) VALUES (:rutaImagen, :id_usuario)");
            $consulta->bindParam(':rutaImagen', $rutaImagen, PDO::PARAM_STR);
            $consulta->bindParam(':id_usuario', $id_usuario, PDO::PARAM_STR);
            return $consulta->execute();
        }
        
        public function eliminarImage($idImagen){
            $consulta = $this->pdo->prepare("DELETE FROM imagenes WHERE id_imagen = :idImagen");
            $consulta->bindParam(':idImagen', $idImagen, PDO::PARAM_STR);
            return $consulta->execute();
        }
        

    }


?>