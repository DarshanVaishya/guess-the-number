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

		document.querySelector(".check").style.display = "none";
		document.querySelector(".again").style.display = "block";
		document.querySelector(".title").textContent = "Game over";
		return;
	}

	const guess = +document.querySelector(".guess").value;
	if (!guess) {
		displayMessage("No number!");
	} else if (guess < 1 || guess > 20) {
		displayMessage("Must be between 1 and 20");
	} else if (guess === secretNumber) {
		displayMessage("Correct number");
		document.querySelector("body").style.backgroundColor = "#60b347";

		// Replacing with correct number
		let numberEls = document.getElementsByClassName("number");
		for (let i = 0; i < numberEls.length; i++) {
			numberEls[i].textContent = secretNumber;
		}

		// Updating and storing the highscore
		const highscore = +document.querySelector(".highscore").textContent;
		if (score > highscore) {
			document.querySelector(".highscore").textContent = score;
			localStorage.setItem("highscore", score);
		}

		document.querySelector(".check").style.display = "none";
		document.querySelector(".again").style.display = "block";
		document.querySelector(".title").textContent = "Correct number";
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
	document.querySelector(".guess").value = "";
	let numberEls = document.getElementsByClassName("number");
	for (let i = 0; i < numberEls.length; i++) {
		numberEls[i].textContent = "?";
	}

	document.querySelector(".again").style.display = "none";
	document.querySelector(".check").style.display = "block";
	document.querySelector(".title").textContent = "Guess the number";
});

document.querySelector(".btn.reset").addEventListener("click", () => {
	localStorage.removeItem("highscore");
	document.querySelector(".highscore").textContent = "0";
});
