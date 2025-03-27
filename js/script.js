// interval per countdown
// un count da 30s, count-- ad ogni 1000ms
// stampo count sul div #countdown

// Genero 5 numeri casuali, li salvo in un array e li aggiungo alla ul #numbers-list
// timeout di funzione che aggiunge i numeri alla ul #numbers-list dopo i 30s

// funzione che fa apparire il form #answers-form dopo i 30s
// concatena i risultati in un array risposte
// confronta risposte con array numeri
// stampo risultato in #message

// inizio script

// dichiarazione variabili
const numbers = [];
const countdown = document.getElementById('countdown');
const instructions = document.getElementById('instructions');
const numbersList = document.getElementById('numbers-list');
const answersForm = document.getElementById('answers-form');
const button = document.querySelector('button');
const message = document.getElementById('message');

// funzione generatore numeri randomici
function RNG(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// funzione comparazione risposte
function compareAnswers(answers, numbers){
    let result = [];
    for (let i = 0; i < answers.length; i++){
        for (let j = 0; j < numbers.length; j++){
            if (answers[i] == numbers[j]){
                result.push(answers[i]);
                // dopo aver trovato il numero corrispondente lo rimuovo dall'array per evitare ripetizioni
                numbers.splice(j, 1);
            }
        }
    }
    return result;
}

// countdown
let count = 30;
let interval = setInterval(() => {
    count--;
    countdown.innerHTML = count;
    if (count === 0){
        clearInterval(interval);
        countdown.innerHTML = '';
        instructions.innerHTML = 'Inserisci i numeri!';
        document.querySelector('#answers-form').classList.remove('d-none');
    }
}, 1000);

// generazione numeri randomici e salvataggio in array numbers
for (let i = 0; i < 5; i++){
    numbers.push(RNG(1, 50));

    // controllo che il numero generato non sia ripetuto, se si, cancello e rigenero
    for (let j = 0; j < i; j++){
        if (numbers[i] == numbers[j]){
            numbers.splice(i, 1);
            i--;
            break;
        }
    }

    numbersList.innerHTML += `<li>${numbers[i]}</li>`;
}

// cancellazione numeri dallo schermo allo scadere del countdown
setTimeout(() => {
    numbersList.innerHTML = '';
}, (count * 1000));

button.addEventListener('click', function(event){
    event.preventDefault();
    
    const answers = [];
    // salvataggio delle risposte in form nell'array answers
    for (let i = 0; i < 5; i++){
        answers.push(document.querySelector(`input:nth-child(${i + 1})`).value);
    }

    // controllo che le rispsote inserite siano tutti numeri
    for (let i = 0; i < answers.length; i++){
        if (isNaN(answers[i]) || answers[i] == ''){
            message.innerHTML = 'Inserisci solo numeri!';
            return;
        }
    }

    // controllo che le risposte inserite siano uniche
    for (let i = 0; i < answers.length; i++){
        for (let j = i + 1; j < answers.length; j++){
            if (answers[i] == answers[j]){
                message.innerHTML = 'Inserisci numeri unici!';
                return;
            }
        }
    }

    console.log(`risposte inserite: ${answers}`);

    // confronto risposte con numeri
    const result = compareAnswers(answers, numbers);
    if (result.length === 5){
        message.innerHTML = 'Tutti i numeri inseriti sono corretti';
    } else if (result.length > 0){
        message.innerHTML = `Hai inserito ${result.length} numeri corretti: ${result}`;
    } else {
        message.innerHTML = 'Nessun numero inserito correttamente';
    }
})