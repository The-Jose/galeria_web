  const buttonSession = document.getElementById('btn-session-user');
  const iconUser = buttonSession.firstElementChild.src;
  const galeria = document.querySelector('.galeria');
 

  //evento click para la cerrar la sesion y cambiar estilos
  buttonSession.addEventListener('click', () => {
    const state = buttonSession.getAttribute('data-state');
    if( state === 'open' ){
      buttonSession.textContent = 'CERRAR SESIÓN';
      buttonSession.classList.add('btn-close-session');
      buttonSession.setAttribute('data-state', 'close');
      setTimeout(()=>{
        const imgUser = document.createElement('img');
        imgUser.src = iconUser;
        imgUser.classList.add('icon_menu');
        buttonSession.textContent = '';
        buttonSession.appendChild(imgUser);
        buttonSession.classList.remove('btn-close-session');
        buttonSession.setAttribute('data-state', 'open');
      }, 5000)
    }else if( state === 'close' ){
      const closeSession = confirm('¿Esta seguro de cerrar sesión?')
      if( !closeSession ) return;
      location.href = "salir.php";
    } 
  })


  //Evento click en galeria para ampliar la imagen
  galeria.addEventListener("click", function(event) {
    if (event.target.classList.contains("img") ) {
      event.target.classList.toggle("ampliada");
    }else if (event.target.classList.contains("delete-image")){
      const borrarImagen = confirm('¿Esta seguro que quiere borrar esta imagen?');
      if(!borrarImagen) return;
      const idImagen = event.target.parentElement.getAttribute('data-id-img');
      const rutaImagen = event.target.previousElementSibling.getAttribute('src');
      location.href = `./eliminar_imagen.php?idImagen=${idImagen}&rutaImagen=${rutaImagen}`;
    }
  });
  

  const inputArchivos = document.getElementById('fileToUpload');
  const vistaPreviaGallery = document.querySelector('.vistaPreviaGallery');
  const vistaPrevia = document.querySelector('.vistaPrevia');
  const buttons = document.querySelector('.buttons-vista');
  const buttonClosePreview = document.querySelector('#ocultar-vista-previa');


  // Escucha el evento change del input de archivos y hace aparecer la galeria de vista previa
  inputArchivos.addEventListener('change', function () {
      if(inputArchivos.files.length===0) return;
      deleteContent( vistaPreviaGallery ) 
      vistaPrevia.style.display = "block";
      vistaPrevia.classList.add('vistaPrevia-activa')
      buttons.style.display = 'flex';

      // Recorre los archivos seleccionados
      for (let i = 0; i < inputArchivos.files.length; i++) {
          const archivo = inputArchivos.files[i];
  
          // Crea un elemento de imagen para la vista previa
          const imagen = document.createElement('img');
          imagen.className = 'vista-previa-imagen';
          vistaPreviaGallery.appendChild(imagen);
  
          // Crea un objeto URL para la vista previa
          const url = URL.createObjectURL(archivo);
          imagen.src = url;
      }
      vistaPrevia.appendChild(vistaPreviaGallery)
  });

  //BOTON PARA CERRAR LA VISTA PREVIA, LIMPIAR IMAGENES, DESAPARECER VISTA PREVIA
  buttonClosePreview.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('ocultar-vista-previa')){
      vistaPrevia.style.display = 'none';
      deleteContent( vistaPreviaGallery );
    }
  })
  
  //BORRAR CONTENIDO DE CUALQUIER DIV
function deleteContent( element ){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

  
 // Envía el formulario con los archivos al servidor
 const formulario = document.getElementById('subirimagen');
 let solicitudEnProceso = false;
 formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      if(solicitudEnProceso){
          return;
      }
      solicitudEnProceso = true;
      const formData = new FormData(formulario);
      subirImagenes(formData)
        console.log('subiendo')
});

async function subirImagenes(formData){
    const ok = await fetch('subir_imagen.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //solicitudEnProceso = false;
      location.href = location.href;
    })
    .catch(error => {
      console.error(error);
      solicitudEnProceso = false;
    });
    
}

