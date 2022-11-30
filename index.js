$("h1").css("color","red");
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var userClickedPattern=[];
function nextSequence(){
  level+=1;
  $("h1").html("Level "+level);

  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    new Audio( name + ".mp3").play();
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
$(document).keypress(function(){
  if (gamePattern.length==0){
    $("h1").html("Level "+level);
  nextSequence();}
});
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if (userClickedPattern.length==gamePattern.length){
    //console.log("Success");
    setTimeout(function(){
      nextSequence();
    },1000);
  }
  }
  else{
    //console.log("Failure");
    new Audio("wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  gamePattern=[];
  level=0;
}
