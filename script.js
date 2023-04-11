/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

var ArrayofAnswers = [null, null, null];


const answerArray = document.querySelectorAll(".choice-grid div");
for (const answer of answerArray){
    answer.addEventListener('click', changeToSelected);
}


function question(selected, index){
    if (ArrayofAnswers[index] !== null){ //se array non era null allora devo deselezionare l'immagine
        ArrayofAnswers[index].querySelector(".checkbox").src = "images/unchecked.png";
        ArrayofAnswers[index].classList.remove("selezionato");
    }   

    //seleziono l'immagine selezionata
    ArrayofAnswers[index] = selected;
    ArrayofAnswers[index].classList.remove("unselected");
    ArrayofAnswers[index].classList.add("selezionato");
    ArrayofAnswers[index].querySelector(".checkbox").src = "images/checked.png";
    
    //metto unselected tutti i blocchi non selezionati  
    for (let elem of document.querySelectorAll(".choice-grid div")){
        if (elem.dataset.questionId === selected.dataset.questionId){
            if (elem !== selected){
                elem.classList.add("unselected");
            }
        }
    }
       
    if (!ArrayofAnswers.includes(null)){
        visualizzaRisultato();
    }
        
}

function visualizzaRisultato(){
    
    const divFinale = document.querySelector("#risultatoFinale");
    const testoRisultato = document.querySelector("#testoRisultato");
    const titoloRisultato = document.querySelector("#risultatoh1");
    const tasto = document.querySelector("#restart");
    tasto.addEventListener('click', ricominciaQuiz)


    if (!ArrayofAnswers.includes(null)){
        let risultato = null;
        for (let i = 0; i < ArrayofAnswers.length; i++){
            for (let j = i+1; j < ArrayofAnswers.length; j++){
                if(ArrayofAnswers[i].dataset.choiceId === ArrayofAnswers[j].dataset.choiceId)
                    result = ArrayofAnswers[i].dataset.choiceId;
            }
        }
        
        if (risultato === null){
            risultato = ArrayofAnswers[0].dataset.choiceId;
        }
        
        testoRisultato.textContent = RESULTS_MAP[risultato].contents;
        titoloRisultato.textContent = RESULTS_MAP[risultato].title;

    }

    divFinale.classList.remove("hidden");
}

function ricominciaQuiz(event){
    let daNascondere = document.querySelector("#risultatoFinale");
    daNascondere.classList.add("hidden");
    //cambiamo ogni immagine selezionata su unchecked
    for (let i = 0; i < ArrayofAnswers.length; i++){
        ArrayofAnswers[i].querySelector(".checkbox").src = "images/unchecked.png";
        ArrayofAnswers[i].classList.remove("selezionato");
    }
    const arr = document.querySelectorAll(".choice-grid div");
    for (let elem of arr){
        elem.classList.remove("unselected");
    }
    ArrayofAnswers = [null, null, null];
}


function changeToSelected(event){
   const selected = event.currentTarget;
   if (selected.dataset.questionId == "one"){
    question(selected, 0);
   }
   else if (selected.dataset.questionId == "two"){
    question(selected, 1);
   }
   else question(selected, 2);
}



