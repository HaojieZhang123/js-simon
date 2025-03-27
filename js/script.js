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
                console.log(`Trovato il numero ${answers[i]}`);
                result.push(answers[i]);
                // dopo aver trovato il numero corrispondente lo rimuovo dall'array per evitare ripetizioni
                numbers.splice(j, 1);
            }
        }
    }
    console.log(`risultato funzione: ${result}`);
    return result;
}

// countdown
let count = 3;
let interval = setInterval(() => {
   countdown.innerHTML = count;
    count--;
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
    numbersList.innerHTML += `<li>${numbers[i]}</li>`;
}
console.log(`numeri generati: ${numbers}`);

// cancellazione numeri dallo schermo allo scadere del countdown
setTimeout(() => {
    numbersList.innerHTML = '';
}, (count * 1000));

button.addEventListener('click', function(event){
    event.preventDefault();
    // salvataggio delle risposte in form nell'array answers
    answers.push(document.querySelector('input').value);
    answers.push(document.querySelector('input:nth-child(2)').value);
    answers.push(document.querySelector('input:nth-child(3)').value);
    answers.push(document.querySelector('input:nth-child(4)').value);
    answers.push(document.querySelector('input:nth-child(5)').value);

    console.log(`risposte inserite: ${answers}`);

})