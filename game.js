const buttonColors = [ "red", "blue", "green", "yellow" ];
let gamePattern = [];
let userPattern = [];
let gameOn = false;
let level = 0;

// FUNCTIONS
const playSound = (color) => {
	switch (color) {
		case "red":
			const red = new Audio("sounds/red.mp3");
			red.volume = 0.4;
			red.play();
			break;
		case "blue":
			const blue = new Audio("sounds/blue.mp3");
			blue.volume = 0.4;
			blue.play();
			break;
		case "green":
			const green = new Audio("sounds/green.mp3");
			green.volume = 0.4;
			green.play();
			break;
		case "yellow":
			const yellow = new Audio("sounds/yellow.mp3");
			yellow.volume = 0.4;
			yellow.play();
			break;
		default:
	}
};

const gameOver = () => {
	// Play audio for wrong answer
	const wrong = new Audio("sounds/wrong.mp3");
	wrong.volume = 0.2;
	wrong.play();
	// Add gameover styling
	$("body").addClass("game-over");
	setTimeout(() => {
		$("body").removeClass("game-over");
	}, 500);
	$("#level-title").text("GAME OVER");
	const t = setInterval(() => {
		setTimeout(() => {
			$("#level-title").text("PRESS ANY KEY TO RESTART");
		}, 600);
		setTimeout(() => {
			$("#level-title").text("GAME OVER");
		}, 1600);
		$("#level-title").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
	}, 3000);
	setTimeout(() => {
		clearInterval(t);
	}, 10000);
};

const startOver = () => {
	level = 0;
	gamePattern = [];
	gameOn = false;
};

const nextSequence = () => {
	// Reset userPattern
	userPattern = [];

	level += 1;
	$("#level-title").text(`Level ${level}`);

	// Make random number to choose random color, and add to gamePattern array
	const randomNumber = Math.floor(Math.random() * 4);
	const randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	// Animation and sound for sequence
	$(`#${randomChosenColor}`).fadeOut(200).fadeIn(200);
	playSound(randomChosenColor);
};

const checkSequence = (currentLevel) => {
	console.log(gamePattern);
	console.log(userPattern);
	if (gamePattern[currentLevel] === userPattern[currentLevel]) {
		if (userPattern.length === gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		gameOver();
		startOver();
	}
};

$(document).keypress(() => {
	if (!gameOn) {
		$("#level-title").text(`Level ${level}`);
		nextSequence();
		gameOn = true;
	}
});

$(".btn").click((event) => {
	// Save user selection into variable and add selection to user array
	const userChosenColor = event.target.id;
	userPattern.push(userChosenColor);
	// Animation and sound for selection
	playSound(userChosenColor);
	$(`#${userChosenColor}`).addClass("pressed");
	setTimeout(() => {
		$(`#${userChosenColor}`).removeClass("pressed");
	}, 150);
	// Call function to check if userPattern matches gamePattern
	checkSequence(userPattern.length - 1);
});
