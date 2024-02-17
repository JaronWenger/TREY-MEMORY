
console.log("🎃")


const baseArray = ["🌲","🌲","🌲","🌲","☁️","☁️","☁️","☁️","🌲","🌲","☁️","☁️","🍎","🍎","🍎","🍎","🍎","🍎"];
var list = [".one",".two",".three",".four",".five",".six",".seven",".eight",".nine",".ten",".eleven",".twelve",".thirteen",".fourteen",".fifteen",".sixteen",".seventeen",".eighteen"];
var numbers = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen"];
var revealed = [];
var omega = shuffle(baseArray);
labelButtons(omega);
var win = [];
var playerTurn = true;
var p1score = 0;
var p2score = 0;
var skip = false;
var tron = one


var checkSystem = [];
var blink = [];


//SET UP
function shuffle(array){
  let shuffledArray = [];
  let usedIndexes = [];

  let i = 0;
  while(i < array.length){
    let randomNumber = Math.floor(Math.random() * array.length);
    if(!usedIndexes.includes(randomNumber)){
      shuffledArray.push(array[randomNumber]);
      usedIndexes.push(randomNumber);
      i++;
    }
  }
  console.log(shuffledArray);
  return shuffledArray;
}


//SET UP
function labelButtons(array){
let i = 0
while(i < array.length){

  var moment = omega[i];
  $(list[i]).text(moment);
  $(list[i]).hide();
  console.log(list[i]);
i++
}
}





//CLICKING ON A TILE
$(".btn").click(function(){

  var chosenBox = $(this).attr("id");

if (!revealed.includes("." + chosenBox)){

  $("#" + chosenBox).addClass("pressed");
setTimeout(function () {
  $("#" + chosenBox).removeClass("pressed");
}, 100);
  revealed.push("." + chosenBox);


  $("." + chosenBox).show();

  tron = chosenBox
  checkClick(chosenBox);


}
});



//RESET THE GAME:
$(document).keypress(function(event){
  for (i=0; i<18; i++){
    $("#" + numbers[i]).removeClass("green");
    $("#" + numbers[i]).addClass("blue");
  }
  p1score = 0;
  p2score = 0;
  $("#level-score").text(p1score + "-" + p2score);
  $("#level-title").text("P1");
  revealed = [];
  omega = shuffle(baseArray);
  labelButtons(omega);
});

$("h1").click(function(){
  for (i=0; i<18; i++){
    $("#" + numbers[i]).removeClass("green");
    $("#" + numbers[i]).addClass("blue");
  }
  p1score = 0;
  p2score = 0;
  $("#level-score").text(p1score + "-" + p2score);
  $("#level-title").text("P1");
  revealed = [];
  omega = shuffle(baseArray);
  labelButtons(omega);
});












////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkClick(value){
  

  checkSystem.push(list.indexOf("." + value));
  blink.push(value);

  var uno = checkSystem[0];
  var dos = checkSystem[1];
  var tres = checkSystem[2];

  if (checkSystem.length === 2){

    // if (omega[uno] === omega[dos]){
    //   //DO NOTHING, youre doing good, two match
    // }else{

    //   //2nd does not match////////////////////////

    //   if (skip){

    //   setTimeout(function(){
    //     $("." + value).hide();
    //     $(list[uno]).hide();
    //     $(list[dos]).hide();
    
    //     if (!playerTurn){
    //     $("#level-title").text("P1");
    //     playerTurn = true;
    //   }else{
    //     $("#level-title").text("P2");
    //     playerTurn = false;
    //   }
    
    
    //     revealed.pop(uno);
    //     revealed.pop(dos);
    
    //     $("#" + value).fadeIn(100).fadeOut(100).fadeIn(100);
    //     $("#" + blink[0]).fadeIn(100).fadeOut(100).fadeIn(100);
    //     blink = [];
    //   },200);
    
    //     checkSystem = [];
    //     skip = false
    // }}
    ///////////////////////////////////////////////////////////////





  }else if (checkSystem.length === 3){

    if(omega[uno] === omega[dos] && omega[dos] === omega[tres]){

//WINNER WINNER, all three match  ////////////////////////------------------------------------///////////////////////////////////////////////
if (!playerTurn){
  $("#" + value).removeClass("blue");
  $("#"+ blink[0]).removeClass("blue");
  $("#"+ blink[1]).removeClass("blue");
  $("#" + value).addClass("red");
  $("#"+ blink[0]).addClass("red");
  $("#"+ blink[1]).addClass("red");
  p2score++
  $("#level-score").text(p1score + "-" + p2score);
}else{
  $("#" + value).removeClass("blue");
  $("#"+ blink[0]).removeClass("blue");
  $("#"+ blink[1]).removeClass("blue");
  $("#" + value).addClass("green");
  $("#"+ blink[0]).addClass("green");
  $("#"+ blink[1]).addClass("green");
  p1score++
  $("#level-score").text(p1score + "-" + p2score);
}

  checkSystem = [];
  blink = [];
  win.push("1","1","1");

  if (win.length === 18){
    if (p1score > p2score){
    $("#level-title").text("P1 wins!");
    p1score = 0;
    p2score = 0;
    win = [];
  }else if (p2score > p1score){
    $("#level-title").text("P2 wins!");
    p1score = 0;
    p2score = 0;
    win = [];
  }else{
    $("#level-title").text("tie!");
    p1score = 0;
    p2score = 0;
    win = [];
  }
  }
  ///////////////////////////////////////////////////------------------------------------///////////////////////////////////////////////


    }else{

      //RESET CHECKER, 3rd does not match//////////
      setTimeout(function(){
        $("." + value).hide();
        $(list[uno]).hide();
        $(list[dos]).hide();
    
        if (!playerTurn){
        $("#level-title").text("P1");
        playerTurn = true;
      }else{
        $("#level-title").text("P2");
        playerTurn = false;
      }
    
    
        revealed.pop(uno);
        revealed.pop(dos);
        revealed.pop(tres);
    
        $("#" + value).fadeIn(100).fadeOut(100).fadeIn(100);
        $("#" + blink[0]).fadeIn(100).fadeOut(100).fadeIn(100);
        $("#" + blink[1]).fadeIn(100).fadeOut(100).fadeIn(100);
        blink = [];
      },200);
    
        checkSystem = [];
      
    }
    ///////////////////////////////////////////////
  }else{
    //DO NOTHING because you only picked one so far
  }


}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







//GAME OVER!
function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);



  $("#level-title").text("game over, click here to restart");

  checkSystem = [];
  blink = [];
  win = [];
  revealed.push(".one",".two",".three",".four",".five",".six",".seven",".eight",".nine");


}




//SKIP BUTTON
$(".skipButton").click(function(){
  if (checkSystem.length === 0){

    if (!playerTurn){
      $("#level-title").text("P1");
      playerTurn = true;
    }else{
      $("#level-title").text("P2");
      playerTurn = false;
    }

  } else if (checkSystem.length === 1){

  var uno = checkSystem[0];
  var dos = checkSystem[1];
  var tres = checkSystem[2];

  

  setTimeout(function(){
    $("." + tron).hide();



    if (!playerTurn){
    $("#level-title").text("P1");
    playerTurn = true;
  }else{
    $("#level-title").text("P2");
    playerTurn = false;
  }


    revealed.pop(uno);
    revealed.pop(dos);
    revealed.pop(tres);

    $("#" + tron).fadeIn(100).fadeOut(100).fadeIn(100);


    blink = [];
  },200);

    checkSystem = [];
    skip = false


//////////


  } else {

  var uno = checkSystem[0];
  var dos = checkSystem[1];
  var tres = checkSystem[2];

  

  setTimeout(function(){
    $("." + tron).hide();
    $(list[uno]).hide();


    if (!playerTurn){
    $("#level-title").text("P1");
    playerTurn = true;
  }else{
    $("#level-title").text("P2");
    playerTurn = false;
  }


    revealed.pop(uno);
    revealed.pop(dos);
    revealed.pop(tres);

    $("#" + tron).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + blink[0]).fadeIn(100).fadeOut(100).fadeIn(100);

    blink = [];
  },200);

    checkSystem = [];
    skip = false
  }
  })