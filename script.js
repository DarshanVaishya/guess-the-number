"use strict";

function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);
	console.log(number);
	return number;
}

function displayMessage(message) {
	document.querySelector(".message").textContent = message;
}

let secretNumber = getRandomNumber(1, 21);
const scoreEl = document.querySelector(".score");
let score = 20;

if (localStorage.getItem("highscore")) {
	document.querySelector(".highscore").textContent =
		localStorage.getItem("highscore");
}

document.querySelector(".check").addEventListener("click", () => {
	if (score <= 1) {
		displayMessage("Game over");
		document.querySelector("body").style.backgroundColor = "red";
		scoreEl.textContent = "0";
		return;
	}

	const guess = +document.querySelector(".guess").value;
	if (!guess) {
		displayMessage("No number!");
	} else if (guess === secretNumber) {
		const highscore = +document.querySelector(".highscore").textContent;
		displayMessage("Correct number");
		document.querySelector("body").style.backgroundColor = "#60b347";
		document.querySelector(".number").style.width = "30rem";
		document.querySelector(".number").textContent = secretNumber;

		if (score > highscore) {
			document.querySelector(".highscore").textContent = score;
			localStorage.setItem("highscore", score);
		}
	} else {
		displayMessage(guess > secretNumber ? "Too high" : "Too low");
		scoreEl.textContent = --score;
	}
});

document.querySelector(".btn.again").addEventListener("click", () => {
	score = 20;
	secretNumber = getRandomNumber(1, 21);

	displayMessage("Start guessing...");
	scoreEl.textContent = score;
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector(".number").textContent = "?";
	document.querySelector(".guess").value = "";
	document.querySelector(".number").style.width = "15rem";
});
