var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenGamePattern = [];
var started = false;
var level = 0;

function nextSeq() {
  level++;
  $("h1").text("Level " + level);
  var rand = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[rand];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(randomChosenColor);
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    started=true;
    $("h1").text("Level " + level);
    nextSeq();
  }
});

$(".btn").click(function () {
  var chosenBtn = $(this).attr("id");
  userChosenGamePattern.push(chosenBtn);
  playAudio(chosenBtn);
  animatePress(chosenBtn);
  checkAnswer(userChosenGamePattern.length - 1);
});

function checkAnswer(index) {
  if (userChosenGamePattern[index] === gamePattern[index]) {
    console.log("correct");
    if (userChosenGamePattern.length === gamePattern.length) {
      setTimeout(function () {
        userChosenGamePattern = [];
        nextSeq();
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
    started=false;
    gamePattern=[];
    userChosenGamePattern=[];
    level=0;
}
