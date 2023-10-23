<?php 
    require_once "Imagen.php";
    session_start();
    error_reporting(0);
    if(!$_SESSION['usuario']){
        header("Location: login.php");
        exit;
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="icon" href="./web_imgs/ico_estrella.ico">
    <title>Photo Gallery - Star</title>
</head>
<body>
    <!-- <img src="./web_imgs/logo_estrella.svg" id="logo-estrella"/> -->
    <div class="menu">
        <a class="form-preguntas button-a-index button-menu" href="index.php">
            <img src="./web_imgs/photos.png" id="img_home" class="icon_menu">
        </a>
        <a class="form-preguntas button-a-form button-menu" href="formulario.php">
            <img src="./web_imgs/exam.png" id="img_exam" class="icon_menu">
        </a>
        <div class="nombre-usuario button-menu" id="btn-session-user" data-state="open">
            <img src="./web_imgs/user.png" id="img_user" class="icon_menu">
            <!-- <p class="text_id_user">
                <?php echo $_SESSION['usuario']."-".$_SESSION['id'] ?>
            </p> -->
        </div>
    </div>
    
    <div class="form-imagen">
        <form action="subir_imagen.php" method="POST" enctype="multipart/form-data" id="subirimagen">
            <input type="file" name="imagenes[]" id="fileToUpload" multiple>
            <label for="fileToUpload" class="file-label button-di"> 
                <img src="./web_imgs/camera.png" id="img_camera" class="icon_menu">CAPTURAR FOTO
            </label>
            <div class="vistaPrevia">   
                <div class="menu buttons-vista"> 
                    <button id="ocultar-vista-previa" class="button-menu ocultar-vista-previa btn-action-file">CERRAR</button>
                    <div class="message-preview button-menu">VISTA PREVIA</div>
                    <input type="submit" value="ENVIAR" class="button-menu btn-enviar-imagenes btn-action-file" name="submit" id="enviar-imagen">
                </div>
                <div class="vistaPreviaGallery">

                </div>
            </div>
            
        </form>
    </div>
    <div class="galeria">
        <?php
            $imagen = new Imagen();
            $listaImagenes = $imagen->obtenerImagenes();
            foreach($listaImagenes as $fila){
                ?>
                <div class="imagen" data-id-user="<?php echo $fila['id_usuario'] ?>"  data-id-img="<?php echo $fila['id_imagen'] ?>">
                    <img class="img" src="<?php echo $fila['rutaImagen'] ?>" onerror="this.parentElement.style.display='none';" loading="lazy"/>
                    <?php 
                        if(intval($_SESSION['id'])===intval($fila['id_usuario'])){
                            ?><button class="delete-image">Borrar</button><?php
                        }
                    ?>
                </div>
                <?php
            }
        ?>
    </div>
    <script src="./js/app-galeria.js"></script>
</body>
</html>