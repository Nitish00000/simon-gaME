var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
// empty array
var userClickedPattern = [];
// use jquery to detect when any buttons is clicked and trigger a handler function
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;
// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  // select the elememt with id
  var userChosenColour = $(this).attr("id");
  // addinfg element to the new array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

}

// Create a new function called playSound() that takes a single input parameter called name.

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // flashing take place
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


function playSound(name) {
  // adding to play Audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// animation function
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
