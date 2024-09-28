// Create the buttonColours array
var buttonColours = ["red", "blue", "green", "yellow"];

// Create the gamePattern array
var gamePattern = [];

// Create an empty array to hold the user's clicked pattern
var userClickedPattern = [];

// Create a variable to keep track of the game level
var level = 0;

// Variable to check if the game has started
var started = false;

// Use jQuery to detect a keyboard key press to start the game
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Function to play sound for the selected button
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to handle the next sequence generation
function nextSequence() {
    userClickedPattern = []; // Reset userClickedPattern for the next level
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Use jQuery to detect button clicks and trigger a handler function
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer with the index of the last user answer
    checkAnswer(userClickedPattern.length - 1);
});

// Create a new function called animatePress that takes a single input parameter called currentColour
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Create the checkAnswer function
function checkAnswer(currentLevel) {
    // Check if the most recent user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence after a 1000 millisecond delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        // Play the "wrong.mp3" sound
        playSound("wrong");

        // Add the "game-over" class to the body
        $("body").addClass("game-over");

        // Remove the "game-over" class after 200 milliseconds
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() to reset the game state
        startOver();
    }
}

// Step 1: Create a new function called startOver
function startOver() {
    // Step 3: Reset the values of level, gamePattern, and started
    level = 0;
    gamePattern = [];
    started = false;
}
