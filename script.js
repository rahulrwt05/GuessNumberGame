// Generate a random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// Select DOM elements
const submit = document.querySelector(".subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".result");

// Create a paragraph element for future use
const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playGame = true;

// Add event listener to the submit button if the game is active
if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess); // Log the user's guess for debugging
    validateGuess(guess); // Validate the user's guess
  });
}

// Validate the user's guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number more than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    prevGuess.push(guess); // Add guess to the list of previous guesses
    if (numGuess === 11) {
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame(); // End the game if maximum guesses reached
    } else {
      displayGuess(guess); // Display the user's guess
      checkGuess(guess); // Check if the guess is correct
    }
  }
}

// Display the user's guess
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} `;
}

// Check if the user's guess is correct
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame(); // End the game if the guess is correct
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOO low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOO high`);
  }
}

// Display feedback messages to the user
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End the game and allow user to start a new one
function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");

  p.classList.add("button");
  p.innerHTML = `<button id="newGame" class="button subt">Start New Game</button>`;
  lowOrHi.appendChild(p);
  playGame = false;
  newGame(); // Enable starting a new game
}

// Reset the game and start over
function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
    lowOrHi.innerHTML = "";
  });
}
