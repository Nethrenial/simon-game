var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$("button").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("button").text("Play!");
  }
});

$('.btn').click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);
});








function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $('#level-title').text("Level " + level);
  userClickedPattern = [];

}







function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}







function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      score = score + 10;
      $("button").css("visibility","hidden");
    }
  } else {

    playSound("wrong");
    $("body").addClass("gameover");
    setTimeout(function() {
      $("body").removeClass("gameover");
    }, 200);
    $("h1").text("Game Over, Press A Key or the Button to Restart,Your score is "+ score +"!");
    $("button").css("visibility","visible");
    $("button").text("Restart!");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  score = 0;
}
