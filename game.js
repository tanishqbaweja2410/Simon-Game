var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
// console.log(buttonColours[3]);
var started = false;


$(".btn").on("click",function (){

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
console.log(userClickedPattern);
animatePress((userChosenColour));
checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

// nextSequence();




function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function (){$("#" + currentColour).removeClass("pressed")},100);
}


$(document).on("keypress",function() {
  if(!started){
    console.log("executed!!!");
    nextSequence();
    started = true;
  }

});


var level = 0;

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success!");
    if(currentLevel === gamePattern.length - 1){
      setTimeout(function (){
        nextSequence();}
      ,1000);
      userClickedPattern = [];
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}


function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}





// console.log(randomChosenColour);
// document.querySelector("#"+randomChosenColour);
// $("")
