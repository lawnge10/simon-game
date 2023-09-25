var gamepatterns=[];
var buttoncolors=["red","blue","green","yellow"];
var userclickedpattern=[];
var level=0;
var started=false;


$(document).keypress(function() {
    if (!started) {
  
      
      $("#level-title").text("Level " + level);
      nextsequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
   
    playsound(userchosencolor);
    animatePress(userchosencolor);
    checkanswer(userclickedpattern.length-1);
});
function checkanswer(currentlevel){
        if(gamepatterns[currentlevel]===userclickedpattern[currentlevel]){
             console.log("success");
             if(userclickedpattern.length===gamepatterns.length){
              setTimeout(function(){
                nextsequence();
              },1000);
             }
        }else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over,Press Any Key to Restart");
        startover();
        }
       
}
function nextsequence(){
  userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+ level);
   
    var num=Math.floor(Math.random()*4);
    var randomchosencolor=buttoncolors[num];
gamepatterns.push(randomchosencolor);
$("#"+ randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
var audio=new Audio("sounds/"+ randomchosencolor +".mp3");
audio.play();
playsound(randomchosencolor);

}


function playsound(name){
  var audio=new Audio("sounds/"+ name +".mp3");
audio.play();

}

function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function () {
      $("#" + currentcolor).removeClass("pressed");
    }, 100);
}
function startover(){
  level=0;
  gamepatterns=[];
  started=false;
}

