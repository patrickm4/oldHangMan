var deCar= ["toyota", "honda", "nissan", "mazda"];
var whichWord= Math.round((Math.random()*3)+0);
var est= document.getElementById("deGuess").value;
var guessWord= document.getElementById("displayWord");
var wordDisp= document.getElementById("deWord");
var dePick= deCar[whichWord];
var checkLines = [];
var newArray=[];
var guesses=[];
var score=0;
var hmw=60;

function displayWordToGuess(){
    deDisWord= dePick.split("");

    for(var i=0;i<deDisWord.length;i++){
        console.log(deDisWord);
        var wordLines= document.createElement("div");
        var newCon= document.createTextNode(" _ ");
        wordLines.id="deDiv"+i;
        wordLines.appendChild(newCon);
        guessWord.appendChild(wordLines);
    }
}


$(document).ready(function(){

    displayWordToGuess();
    $("#reload").hide();
    $("#reload").click(function(){
       location.reload(); 
    });
    $("form").on("submit", function (event){
      event.preventDefault();

      var ans= $("#deGuess").val();

      checkForLetter(ans);

      document.getElementById("mainInp").reset();
    });

function checkForLetter(userGuess){
  for(var i = 0; i < dePick.length; i++){
    if(dePick.indexOf(userGuess) != -1){
      console.log(dePick.indexOf(userGuess)+"yes");
      $("#hangman").animate({backgroundColor: 'green'}, 100);
      checkLetter(userGuess);
      break;
    }
    else{
      console.log(dePick.indexOf(userGuess)+"No");
      $("#hangman").animate({backgroundColor: 'red'}, 100);
      var letterDiv= document.createElement("div");
      letterDiv.innerHTML= userGuess;
      wordDisp.appendChild(letterDiv);
      score++;
      hmw -= 9;
      $("#hangman").animate({width: hmw+'vw'}, 100);
      if(score >= 7){

        $("body").animate({backgroundColor: 'red'}, 1000);
        $("#peep").hide(1000);
        $("#reload").show();
      }
      break;
    }
  }
}



function checkLetter(userAns){
    if(dePick.includes(userAns)){
    for(var x=0;x<dePick.length;x++){
        if(dePick[x] == userAns){
            console.log("yaw"+deDisWord[x]);
            checkLines.push(x);
        }
    }
    for(var f=0;f<checkLines.length;f++){
        document.getElementById("deDiv"+checkLines[f]).textContent = userAns;
    }
    checkLines = [];
    checkForAns();
    }


}

function checkForAns(){
    for(var r=0; r<deDisWord.length;r++){
        var deLetter= document.getElementById("deDiv"+[r]).textContent;
        guesses.push(deLetter);
    }
    if(guesses.join('|') === deDisWord.join('|')){
        $("body").animate({backgroundColor: 'green'}, 1000);
        $("#reload").show();
    }
    else {
        guesses=[];
    }
}
  });
