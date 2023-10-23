<?php
require_once "Imagen.php";
session_start();
if(!$_SESSION['usuario']){
    header("Location: index.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // echo json_encode("todo bien");
    // exit();
    $numImagenes = count($_FILES['imagenes']['name']);
    $existImages = trim($_FILES['imagenes']['name'][0]);
    if($existImages!==""){
        $directorio = "imagenes/"; // Carpeta de destino para guardar las imágenes.
        for( $i=0; $i < $numImagenes; $i++ ){
            $rutaArchivo = $directorio . basename($_FILES["imagenes"]["name"][$i]);
            $cargaCompleta = true;
            $extensionImagen = strtolower(pathinfo($rutaArchivo, PATHINFO_EXTENSION));
            $imagenValida = getimagesize($_FILES["imagenes"]["tmp_name"][$i]);
            if ((!$imagenValida) || ($extensionImagen != "jpg" && $extensionImagen != "png" && $extensionImagen != "jpeg" && $extensionImagen != "webp" )) $cargaCompleta = false;
            if ($cargaCompleta) {
                $id_usuario = $_SESSION['id'];
                //Crear nombre de imagen y subirla a carpeta del servidor
                $nombreNuevo = uniqid() . "." . $extensionImagen; 
                $rutaImagen= $directorio . $nombreNuevo;
                if (move_uploaded_file($_FILES["imagenes"]["tmp_name"][$i], $rutaImagen)) {
                    // echo "El archivo " . htmlspecialchars(basename($_FILES["imagenes"]["name"][$i])) . " ha sido subido correctamente.";
                    // echo "<br>";
                    $imagen = new Imagen();
                    $imagen->agregarImagen("./".$rutaImagen, $id_usuario);
                } else {
                    // echo "Hubo un error al subir el archivo.";
                }
            }
        }
        echo json_encode('Se han subido los archivos');
    }

}
?>