var keyPressed = false;
var gamePattern = [];
var userClickedPattern = [];
var userColor;
var randomChosenColor;
var buttonColors = ["red", "blue", "green", "yellow"];
var sounds = [new Audio("sounds/red.mp3"), new Audio("sounds/blue.mp3"), new Audio("sounds/green.mp3"), new Audio("sounds/yellow.mp3")];
var level = -1;

function nextSequence() {
  var randomNumber =  Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeTo(100, 0.2).fadeTo(100, 1);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern.length = 0;
  return randomChosenColor;
}

$(".btn").click(function() {
  userColor = this.id;
  userClickedPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userClickedPattern.length-1);
  return userColor;
});

function playSound(name) {
var soundToPlay = new Audio("sounds/" + name + ".mp3")
soundToPlay.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

$(document).keydown(function(){
  if(keyPressed===false) {
    nextSequence();
    keyPressed=true;
    $("#level-title").text("Level " + level);
  } else {
    console.log("Already started")
  }
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    if(gamePattern.length===userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = -1;
  keyPressed = false;
  gamePattern.length = 0;
  }
