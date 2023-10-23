const loginForm = document.getElementById('login-form');
const buttonsBox = document.querySelector('.buttons-log-reg');
const buttonReg = document.querySelector('.button-register');
const buttonLog = document.querySelector('.button-login');
const formTitle = document.querySelector('.form-title');

buttonsBox.addEventListener('click', (e) => {
    e.target.classList.add('button-active');
    if(e.target===buttonLog){  
        buttonReg.classList.remove('button-active');
        loginForm.setAttribute('data-type', 'login');
        formTitle.textContent = 'INICIA SESIÓN CON TU DNI:';
    }else if(e.target===buttonReg){
        buttonLog.classList.remove('button-active');
        formTitle.textContent = 'REGISTRATE CON TU DNI:';
        loginForm.setAttribute('data-type', 'register');
    }
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const inputValue = e.target[0].value;
    // const confirmSubmit = confirm(`¿Esta seguro de guardar este número?\n${inputValue}`);
    // if( confirmSubmit ){
    //     const formDataLogin = new FormData( loginForm );
    //     existsUser( formDataLogin );
    // }
    const formDataLogin = new FormData( loginForm );
    const actionType = loginForm.getAttribute('data-type');
    if(actionType==="login"){
        loginUser( formDataLogin );
    }else if(actionType==="register"){
        registerUser( formDataLogin )
    }
    
    // const formDataLogin = new FormData( loginForm );
    // registerUser( formDataLogin );
})

const loginUser = async ( formDataLogin ) => {
    const loginUser = await fetch('login-user.php', {
        method: 'POST',
        body: formDataLogin
    })
    .then( response => response.json() )
    .catch( error => console.warn(`ERROR: ${error}`) )
    if( loginUser.state ){
        showMessage( loginForm, 'success', loginUser.message );
        location.href = "./index.php";
    }else {
        showMessage( loginForm, 'error', loginUser.message )
    }
}

const registerUser = async ( formDataLogin ) => {
    const existsUser = await fetch('crear-usuario.php', {
        method: 'POST',
        body: formDataLogin
    })
    .then( response => response.json() )
    .catch( error => console.warn(`ERROR: ${error}`) )
    if( existsUser.state ){
        showMessage( loginForm, 'success', existsUser.message )
        location.href = "./index.php";
    }else {
        showMessage( loginForm, 'error', existsUser.message )
    }
    
}

const showMessage = ( contain, type, text ) => {
    const existMessage = loginForm.querySelector('.contain-message');
    if( existMessage ){
        existMessage.remove();
    }
    const contain_message = document.createElement('div');
    contain_message.textContent = text;
    contain_message.classList.add('contain-message');
    if(type==="error"){
        contain_message.classList.add('error-message');
    }else if(type==="success"){
        contain_message.classList.add('success-message');
    }
    contain.insertBefore(contain_message, contain.firstElementChild);
    setTimeout(() => {
        contain_message.remove();
    }, 3000);
}

