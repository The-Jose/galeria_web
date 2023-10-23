<?php
    require_once "Imagen.php";

    if (isset($_GET['rutaImagen'])) {
        $ruta_imagen = $_GET['rutaImagen'];
        $id_imagen = $_GET['idImagen'];
        if (unlink($ruta_imagen)) {
            $img = new Imagen();
            $img->eliminarImage($id_imagen);
            header("Location: index.php");
        }
    }


?>