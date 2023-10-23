const contenedor = document.querySelector(".contenedor-principal");
const gatoGif = document.querySelector(".gato");
const doQuiz = parseInt(contenedor.getAttribute('data-do-Quiz'));
const showResponses = parseInt(contenedor.getAttribute('data-show-answers'));
const messageBox = document.querySelector('.message-box');

function animacionGato(){
    setTimeout(() => {
        gatoGif.classList.add('gato-oculto');
    }, 7000);
}



function getQuizData(){
    return [
        {
            id_question: 'question1',
            question_text: '¿Cuantos años cumple el grupo estrella?',
            options: ['2 años', '20 años', '10 años', '5 años'],
            correctOption: '10 años',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question2',
            question_text: '¿Cuantas tiendas en el rubro de comercio tenemos en camaná?',
            options: ['Estrella San Francisco', 'Estrella San Gregorio', 'Estrella El Carmen', 'Estrella el centro'],
            correctOption: 'Estrella San Francisco',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question3',
            question_text: '¿Cuantos rubros tiene el grupo estrella?',
            options: ['El Molino', 'Puerto Rico', 'Rio de Janeiro', 'Pedregal'],
            correctOption: 'El Molino',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question4',
            question_text: 'Seleccione el rubro que no pertenece al grupo estrella',
            options: ['El Molino', 'Puerto Rico', 'Rio de Janeiro', 'Pedregal'],
            correctOption: 'El Molino',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question5',
            question_text: 'En el rubro de agricultura que cultivo plantamos',
            options: ['El Molino', 'Puerto Rico', 'Rio de Janeiro', 'Pedregal'],
            correctOption: 'El Molino',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question6',
            question_text: 'Productos que produce el grupo estrella',
            options: ['El Molino', 'Puerto Rico', 'Rio de Janeiro', 'Pedregal'],
            correctOption: 'El Molino',
            userOption: null,
            divContainer: null
        },
        {
            id_question: 'question7',
            question_text: '¿Cuantos años cumplio el colegio Jesus El Maestro?',
            options: ['El Molino', 'Puerto Rico', 'Rio de Janeiro', 'Pedregal'],
            correctOption: 'El Molino',
            userOption: null,
            divContainer: null
        },
    ]
}
// const questionsArray = JSON.parse(localStorage.getItem('quizDataArray')) || getQuizData();
function crearPreguntas( questionsArray ){

    //Iterar cada elemento
    questionsArray.forEach( (questionData) => {

        const quizContainer_div = document.createElement('div');
        quizContainer_div.classList.add('quiz-container');

        //Asignar el contenedor a su correspondiente posicion en el arreglo
        questionData.divContainer = quizContainer_div;

        const questionBlock_div = document.createElement('div');
        questionBlock_div.classList.add('question-block');

        const pregunta_h2 = document.createElement('h2');
        pregunta_h2.textContent = questionData.question_text;

        const opciones_div = document.createElement('div');
        opciones_div.classList.add('options');
        
        const optionsArray = questionData.options;

        optionsArray.forEach((option)=>{

            const opcion = document.createElement('div');
            opcion.classList.add('option');

            const inputRadio = document.createElement('input');
            inputRadio.type = "radio";
            inputRadio.classList.add('radio');
            inputRadio.name = questionData.id_question;
            inputRadio.value = option;
            inputRadio.id = generarIdUnico();

            const label = document.createElement('label');
            label.classList.add('option-label');
            label.htmlFor = inputRadio.id;
            label.textContent = option;

            opcion.appendChild(inputRadio);
            opcion.appendChild(label);
            opciones_div.appendChild(opcion);
        });

        questionBlock_div.appendChild(pregunta_h2);
        questionBlock_div.appendChild(opciones_div);      
        quizContainer_div.appendChild(questionBlock_div);
        contenedor.appendChild(quizContainer_div);

    });

}

function showMessageClosedQuiz(){
    deleteContent( contenedor );
    const quizContainer_div = document.createElement('div');
    quizContainer_div.classList.add('quiz-container');
    questionBlock_div = document.createElement('div');
    questionBlock_div.classList.add('question-block');
    questionBlock_div.innerHTML = 'RESPUESTAS GUARDADAS<br>ESTE QUIZ SOLO PUEDE SER REALIZADO UNA VEZ';
    questionBlock_div.style.textAlign = 'center';
    questionBlock_div.style.lineHeight = '20px';
    quizContainer_div.appendChild(questionBlock_div);
    contenedor.appendChild(quizContainer_div);
    

}

function showMessageBox(){
    messageBox.classList.add('message-box-active');
    contenedor.appendChild(messageBox);
    setTimeout(() => {
        messageBox.remove();
    }, 25000);
}

animacionGato();
showMessageBox();
if ( doQuiz ) {
    if( showResponses ){
        //MOSTRAR TODO NORMAL Y RESPUESTAS SIN BOTON      
        //cargar el arreglo con los valores de localstorage
        const questionsArray = JSON.parse(localStorage.getItem('quizDataArray'));
        crearPreguntas( questionsArray );
        showResults( questionsArray );
    }else{
        //no cargar nada
        showMessageClosedQuiz();
    }
}else{
    //MOSTRAR TODO NORMAL CON BOTON
    //MANDAR A LA BD QUE EL USUARIO YA MARCO ID - CREO QUE MEJOR LO HACE UN FORM DE PHP 
    //Cargar el arreglo con todo nuevo
    const questionsArray = getQuizData();
    crearPreguntas( questionsArray );
    createButtonForm();
    console.log('ok');
    contenedor.addEventListener('submit', (e) => {
        e.preventDefault();
        const score = getScore( questionsArray );
        const datos = new FormData(contenedor);
        datos.append('score', score);
        fetch('enviar-respuestas.php', {
            method: 'POST',
            body: datos
        })
        .then( res => res.json() )
        .then( data => console.log(data) );
        localStorage.setItem('quizDataArray', JSON.stringify(questionsArray));
        showMessageClosedQuiz();
    });
}

function deleteContent( element ){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function getScore( questionsArray ){
    questionsArray = getSelections( questionsArray );
    let score = 0;
    for(let i = 0; i < questionsArray.length; i++){
        if(questionsArray[i].correctOption===questionsArray[i].userOption){
            score++;
        }
    }
    return score;
}

function createButtonForm(){
    const quizContainer_div = document.createElement('div');
    quizContainer_div.classList.add('quiz-container');

    const questionBlock_div = document.createElement('div');
    questionBlock_div.classList.add('question-block');

    const buttonForm = document.createElement('input');
    buttonForm.id = 'calcular-resultados';
    buttonForm.type = 'submit';
    buttonForm.value = 'ENVIAR RESPUESTAS'

    quizContainer_div.appendChild(questionBlock_div);
    questionBlock_div.append(buttonForm);
    contenedor.appendChild(quizContainer_div);
}

//tengo que cambiar esto

function generarIdUnico() {
    return crypto.randomUUID();
}



const boton = document.querySelector('#calcular-resultados');

//Rellena el arreglo con las opciones seleccionadas por el usuario
function getSelections( questionsArray ) {
    //Obtener los ID de cada pregunta
    const questionIdArray = questionsArray.map( questionData => questionData.id_question );
    questionIdArray.forEach((questionId, index) => {
        //Obtiene las opciones de cada grupo de input radio
        const options = document.getElementsByName(questionId);
        for (const option of options) {
            if (option.checked) {
                questionsArray[index].userOption = option.value;
                break;
            }
        }
    });
    return questionsArray;
}

function showResults( questionsArray ){

    if(questionsArray[0].divContainer.children[1]) return;

    questionsArray.forEach((questionData) => {

        let response, response2;
        
        if(questionData.correctOption===questionData.userOption){
            response = createResponseBlock(true, `MARCASTE RESPUESTA CORRECTA: ${questionData.correctOption}`);
            questionData.divContainer.appendChild(response);
        }else{
            response = createResponseBlock(false, `MARCASTE RESPUESTA INCORRECTA: ${questionData.userOption}`);
            response2 = createResponseBlock(true, `RESPUESTA CORRECTA FUE: ${questionData.correctOption}`);
            questionData.divContainer.appendChild(response);
            questionData.divContainer.appendChild(response2);
        }
        
    })
}

function createResponseBlock( isCorrect, text ){
    const responseBlock = document.createElement('div');
    responseBlock.classList.add('respon-block');
    responseBlock.textContent = text;
    if( isCorrect ) {
        responseBlock.classList.add('correct-answer');
    }else{
        responseBlock.classList.add('wrong-answer');
    }
    return responseBlock;
}





