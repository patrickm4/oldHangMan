var carMake = ["toyota", "honda", "nissan", "mazda"];
var whichWord = Math.round(Math.random() * 3 + 0);
var est = document.getElementById("inputGuess").value;
var guessWord = document.getElementById("displayWord");
var wordDisp = document.getElementById("deWord");
var chosenCarMake = carMake[whichWord];
var checkLines = [];
var guesses = [];
const alreadyGuess = [];
var score = 0;
var hmw = 60;

function displayWordToGuess() {
  guessWordSplitted = chosenCarMake.split("");

  for (var i = 0; i < guessWordSplitted.length; i++) {
    console.log(guessWordSplitted, chosenCarMake, guessWord);
    var wordLines = document.createElement("div");
    var newCon = document.createTextNode("_");
    wordLines.id = "deDiv" + i;
    wordLines.appendChild(newCon);
    guessWord.appendChild(wordLines);
    console.log(guessWord);
  }
}

hideForm = () => {
  $("#inputGuess").hide();
  $("#deSubmit").hide();
  $("#reload").show();
};

$(document).ready(function() {
  displayWordToGuess();
  $("#inputGuess").focus();
  $("#reload").hide();
  $(".RedPoint").hide();
  $("#reload").click(function() {
    location.reload();
  });
  $("form").on("submit", function(event) {
    event.preventDefault();

    var ans = $("#inputGuess").val();

    //check if they already guess letter
    if (alreadyGuess.includes(ans)) {
      alert("Already tried that letter");
    } else {
      checkForLetter(ans);
    }

    document.getElementById("mainInp").reset();
  });

  function checkForLetter(userGuess) {
    for (var i = 0; i < chosenCarMake.length; i++) {
      if (chosenCarMake.indexOf(userGuess) != -1) {
        console.log(chosenCarMake.indexOf(userGuess) + "yes");
        $("#hangman").animate({ backgroundColor: "green" }, 100);
        alreadyGuess.push(userGuess);
        checkLetter(userGuess);
        break;
      } else {
        console.log(chosenCarMake.indexOf(userGuess) + "No");
        $("#hangman").animate({ backgroundColor: "red" }, 100);
        var letterDiv = document.createElement("div");
        letterDiv.innerHTML = userGuess.toUpperCase();
        wordDisp.appendChild(letterDiv);
        alreadyGuess.push(userGuess);
        score++;
        hmw -= 8;
        $("#hangman").animate({ width: hmw + "vw" }, 100);
        if (score == 6) {
          document.getElementById("gameTitle").innerHTML = "Last Chance";
          $(".RedPoint").show(500);
        }
        if (score >= 7) {
          $("body").animate({ backgroundColor: "red" }, 1000);
          $("#peep").hide(1000);
          hideForm();
          document.getElementById("gameTitle").innerHTML = "Try again!";
        }
        break;
      }
    }
  }

  function checkLetter(userAns) {
    if (chosenCarMake.includes(userAns)) {
      for (var x = 0; x < chosenCarMake.length; x++) {
        if (chosenCarMake[x] == userAns) {
          console.log("yaw" + guessWordSplitted[x]);
          checkLines.push(x);
        }
      }
      for (var f = 0; f < checkLines.length; f++) {
        document.getElementById("deDiv" + checkLines[f]).textContent = userAns;
      }
      checkLines = [];
      checkForAns();
    }
  }

  function checkForAns() {
    for (var r = 0; r < guessWordSplitted.length; r++) {
      var deLetter = document.getElementById("deDiv" + [r]).textContent;
      guesses.push(deLetter);
    }
    if (guesses.join("|") === guessWordSplitted.join("|")) {
      $("body").animate({ backgroundColor: "green" }, 1000);
      document.getElementById("gameTitle").innerHTML = "You Win !";
      hideForm();
    } else {
      guesses = [];
    }
  }
});
