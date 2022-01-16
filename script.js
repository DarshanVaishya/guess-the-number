"use strict";

// Globals
const checkBtn = document.querySelector(".btn.check");
const againBtn = document.querySelector(".btn.again");
const resetBtn = document.querySelector(".btn.reset");

const highscoreEl = document.querySelector(".highscore");
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const titleEl = document.querySelector(".title");
const guessEl = document.querySelector(".guess");
const numberEls = document.querySelectorAll(".number");

let secretNumber = getRandomNumber(1, 21);
let score = 20;

// Functions
function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);
	console.log(number);
	return number;
}

function displayMessage(message) {
	messageEl.textContent = message;
}

// Setting highscore
highscoreEl.textContent = localStorage.getItem("highscore") || 0;

checkBtn.addEventListener("click", () => {
	if (score < 1) {
		displayMessage("Game over");
		document.body.style.backgroundColor = "red";
		scoreEl.textContent = "0";

		checkBtn.style.display = "none";
		againBtn.style.display = "block";
		titleEl.textContent = "Game over";
		return;
	}

	const guess = +guessEl.value;
	if (!guess) {
		displayMessage("No number!");
	} else if (guess < 1 || guess > 20) {
		displayMessage("Must be between 1 and 20");
	} else if (guess === secretNumber) {
		displayMessage("Correct number");
		document.body.style.backgroundColor = "#60b347";

		// Replacing with correct number
		numberEls.forEach((element) => (element.textContent = secretNumber));

		// Updating and storing the highscore
		const highscore = +highscoreEl.textContent;
		if (score > highscore) {
			highscoreEl.textContent = score;
			localStorage.setItem("highscore", score);
		}

		checkBtn.style.display = "none";
		againBtn.style.display = "block";
		titleEl.textContent = "Correct number";
	} else {
		displayMessage(guess > secretNumber ? "Too high" : "Too low");
		scoreEl.textContent = --score;
	}
});

againBtn.addEventListener("click", () => {
	score = 20;
	secretNumber = getRandomNumber(1, 21);

	displayMessage("Start guessing...");
	scoreEl.textContent = score;
	document.body.style.backgroundColor = "#222";
	guessEl.value = "";
	let numberEls = document.getElementsByClassName("number");
	for (let i = 0; i < numberEls.length; i++) {
		numberEls[i].textContent = "?";
	}

	againBtn.style.display = "none";
	checkBtn.style.display = "block";
	titleEl.textContent = "Guess the number";
});

resetBtn.addEventListener("click", () => {
	localStorage.removeItem("highscore");
	highscoreEl.textContent = "0";
});
