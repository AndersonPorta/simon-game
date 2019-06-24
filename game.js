// Array of button colors
var colors = ["green", "red", "yellow", "blue"];

// Each array will store patterns
var gamePattern = [];
var userClickedPattern = [];

// Globa vars
var started = false;
var level = 0;

// Have user type any letter to start the game
$(document).keydown(function (e) {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

// Start game by letting user click on the buttons.
$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


/* HELPER FUNCTIONS */

// Generate random number
function nextSequence() {
    // Increase leve by 1
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    // Flash button
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Play sound
function playSound(name) {
    // Play audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate when user presses a button 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Check answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern.length = 0;
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Reset Everything
function startOver() {
    started = false;
    level = 0;
    userClickedPattern.length = 0;
    gamePattern.length = 0;

}