let listOfDrawnNumbers = [];
let limitNumber = 10;
function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let quantityOfElementsInTheList = listOfDrawnNumbers.length;
    if (quantityOfElementsInTheList == limitNumber) {
        listOfDrawnNumbers = [];
    }
    if (listOfDrawnNumbers.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        listOfDrawnNumbers.push(chosenNumber);
        console.log (listOfDrawnNumbers);
        return chosenNumber;
    }
}

let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'US English Female',{rate:1.2});
}

function showInitialMessage (){
showTextOnScreen('h1', 'The Secret Number Game');
showTextOnScreen('p', 'Choose a number between 1 and 10');
}

showInitialMessage();

function checkGuess() {
    let guess = document.querySelector('input').value;
    if(guess == secretNumber){
        let wordAttempts = attempts > 1 ? 'attempts' : 'attempt';
        let textAttempts = `You found the secret number with ${attempts} ${wordAttempts}!`;
        let winnerText = 'You got it!';
        showTextOnScreen('h1', winnerText);
        showTextOnScreen('p', textAttempts);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if(guess>secretNumber){
            showTextOnScreen('p', 'The secret number is smaller!');
        } else {
            showTextOnScreen('p', 'The secret number is bigger!')
        }
        attempts++;
        clearField();
    }
}

function clearField(){
    guess = document.querySelector('input');
    guess.value = "";
}

function restartGame(){
    secretNumber = generateRandomNumber();
    clearField();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}

