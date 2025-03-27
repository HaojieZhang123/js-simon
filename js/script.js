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
const answers = [];
const countdown = document.getElementById('countdown');
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
            if (answers[i] === numbers[j]){
                result.push(answers[i]);
                // dopo aver trovato il numero corrispondente lo rimuovo dall'array per evitare ripetizioni
                numbers.splice(j, 1);
            }
        }
    }
    return result;
}

// countdown
let count = 10;
let interval = setInterval(() => {
   countdown.innerHTML = count;
    count--;
    if (count === 0){
        clearInterval(interval);
        countdown.innerHTML = count;
        document.querySelector('#answers-form').classList.remove('d-none');
    }
}, 1000);

// generazione numeri randomici e salvataggio in array numbers
for (let i = 0; i < 5; i++){
    numbers.push(RNG(0,99));
    numbersList.innerHTML += `<li>${numbers[i]}</li>`;
}
console.log(numbers);