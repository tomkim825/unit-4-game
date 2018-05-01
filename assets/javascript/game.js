// code to make sure everything is ready before excuting rest of code
$(document).ready(function() {

// character database

var charactersInfo = [
{
    "id": "Luke",
    "attack": 5,
    "health": 100
},
{
    "id": "Jawa",
    "attack": 8,
    "health": 120   
},
{
    "id": "Stormtrooper",
    "attack": 20,
    "health": 150
},
{
    "id": "Boba-Fett",
    "attack": 25,
    "health": 180
},
{
    "id": "Master-Luke",
    "attack": 59,
    "health": 225
}
];

// Declare global variables
var userSelected = false;
var computerSelected = false;
var userAttackPower;
var initialUserAttackPower;
var userHealth = 100;
var initialUserHealth = 100;
var userHealthPercent = 100*userHealth/initialUserHealth + "%";
var userInfo = [{}]
var compAttackPower ;
var compHealth = 100;
var initialCompHealth = 100;
var compHealthPercent = 100*compHealth/initialUserHealth + "%";
var compInfo = [{}];
var score = 0;
var gameover = false;
var audio = $(audio);

// function to initialize game and restart/undo what is done during gameplay
function initializeGame() {
    userSelected = false;
    computerSelected = false;
    score = 0;
    gameover = false;
    compHealthPercent = "100%";
    $('.comp-lifeleft').css("width",compHealthPercent);
    userHealthPercent = "100%";
    $('.comp-lifeleft').css("width",compHealthPercent);
    for(i=0;i>charactersInfo.length;i++) {
        charactersInfo[i].userSelected = false;
        charactersInfo[i].computerSelected = false;
        charactersInfo[i].selectableCharacter = true;
        charactersInfo[i].deadOpponent = false
    };
    $("#comphealth, #userhealth, #compattack, #userattack").empty();
    $('#message-display').css("color","yellow").text("Choose your character:");
    $('#initial-characters').css("color","yellow");
    $('#Luke').appendTo('#initial-characters');
    $('#Jawa').appendTo('#initial-characters');
    $('#Stormtrooper').appendTo('#initial-characters');
    $('#Boba-Fett').appendTo('#initial-characters');
    $('#Master-Luke').appendTo('#initial-characters');
    $('.luke-boy').attr("src","assets/images/luke.png");
    $('.luke-name').text("Luke SkyWalker");
    $('#Master-Luke').css("display","none");
    $('#usercharacter').appendTo('#userbox');
  };
  
// Add an on click listener to all elements that have the class "swcharacter". This is to select characters
function selectCharacter() {
    $(".swcharacter").on("click", function() {

// Check if user has selected character. if selected, checks if computer/opponent is selected
    if (!userSelected){
    $('.swcharacter').appendTo('#choose-enemy');
    $(this).appendTo("#usercharacter");
    $('#message-display').text("");
    userSelected = true;
    // runs a loop to search for the corresponding object with info, then assigns values
    for(i=0; i<charactersInfo.length; i++){
        if(this.id == charactersInfo[i].id){
            userInfo = charactersInfo[i];   
        };
    userAttackPower = userInfo.attack;
    initialUserAttackPower = userInfo.attack;
    userHealth = userInfo.health;
    initialUserHealth = userInfo.health;
    $('#userhealth').text(userHealth);
    $('#userattack').text(userAttackPower);
    updateHealthBarUserSide();
    };
    // once user is selected, opponent selection begins
    $('#message2-display').text("Now choose your opponent:");
    $('#initial-characters').css("color","red");
} else if(!computerSelected){
    $('#message2-display').text("Next enemy in line:");
    if(score > 1){
        $('#message2-display').css("color","white").text("Final Round!");
        };
    $('#message-display').text("PRESS ATTACK! Enemy will counter attack!");
    $(this).appendTo("#computercharacter");
    computerSelected = true;
    // runs a loop to search for the corresponding object with info, then assigns values
    for(i=0; i<charactersInfo.length; i++){
        if(this.id == charactersInfo[i].id){
            compInfo = charactersInfo[i];   
        };
    compAttackPower = compInfo.attack;
    compHealth = compInfo.health;
    initialCompHealth = compInfo.health;
    $('#comphealth').text(compHealth);
    $('#compattack').text(compAttackPower);
    updateHealthBarCompSide();
    };
};
}

});

//   resets userside healthbar
  function updateHealthBarUserSide() {
    userHealthPercent = 100*userHealth/initialUserHealth + "%";
    $('.user-lifeleft').css("width",userHealthPercent);
};

//   resets computerside healthbar
function updateHealthBarCompSide() {
    compHealthPercent = 100*compHealth/initialCompHealth + "%";
    $('.comp-lifeleft').css("width",compHealthPercent);
};

// function to run when user character dies to set life to 0 (incase it is negative) and display to user
function userDied() {
    $('#userhealth').text("0");
    $('.user-lifeleft').css("width","0");
    $('#message-display').css("color","white").text("You lost. Press restart button to play again?");
    $('#usercharacter').appendTo('#defeated-enemy');
    gameover = true;
};

// functon for when attack button is pressed
function attack(){
    // checks if game is computer character is selected. If both characters are in play and not game over, it executes
    if((computerSelected) && (!gameover)){
        // if next hit will not kill computer, take damage off life and display
         if (compHealth>userAttackPower){
        compHealth -= userAttackPower;
        $('#comphealth').text(compHealth);
        updateHealthBarCompSide();
        // if user can withstand counter attack, take hit
        if(userHealth>compAttackPower){
            userHealth -= compAttackPower;
            $('#userhealth').text(userHealth);
            updateHealthBarUserSide();
            userAttackPower += initialUserAttackPower;
            $('#userattack').text(userAttackPower);
        // if user cannot withstand counter attack, run user died function
        } else if ((compAttackPower > userHealth) || (compAttackPower == userHealth)){
            userDied();
        };
// if the next hit will kill computer, set health to 0 (to prevent negative) and display it
    } else {
        $('.comp-lifeleft').css("width","0");
        $('#comphealth').text(0);
        enemyIsDefeated();
        userAttackPower += intialUserAttackPower;
    $('#userattack').text(userAttackPower);
    };
    };    
};

// if enemy is defeated, move them to the defeated enemy section and reset their health bar
function enemyIsDefeated(){
    $('#'+compInfo.id).appendTo('#defeated-enemy');
    computerSelected = false;
    userHealth = initialUserHealth;
    $('#userhealth').text(userHealth);
    updateHealthBarUserSide();
    $('#message-display').text("You Win!");
    $('#message2-display').css("color","white").text("");
    if(!gameover){
    $('#message2-display').css("color","white").text("Choose Another Opponent");
    } 
    // keep track of score
    score ++;
 
    // if all 3 enemies are dead, show personalized message. Also reveal hidden boss if user is not luke
    if ((score == 3)&&(userInfo.id == "Jawa")){
        $('#message-display').css("color","white").text("OO TEE DEE!! JAWA JAWA!! You may now face Master Luke!");
        $('#Master-Luke').css("display","block");
        $('#message2-display').css("color","white").text("Secret Boss Unlocked!:");
    }else if ((score == 3)&&(userInfo.id == "Stormtrooper")){
        $('#message-display').css("color","white").text("TK421, Why aren't you at your post! Return immediately or look under the cargo bay to fight Master Luke!");
        $('#Master-Luke').css("display","block");
        $('#message2-display').css("color","white").text("Secret Boss Unlocked!:");
    }else if ((score == 3)&&(userInfo.id == "Boba-Fett")){
        $('#message-display').css("color","white").text("Well done Bounty Hunter! You shall be paid double. Do you wish to capture Master Luke for the Emperor?");
        $('#Master-Luke').css("display","block");
        $('#message2-display').css("color","white").text("Secret Boss Unlocked!:");
    }else if ((score == 3)&&(userInfo.id == "Luke")){
        $('#message-display').css("color","white").text("Level up! Status: Jedi Master. Your training is now complete. Go to Cloud City to save your friends from Darth Vader! Or restart to play again (play as another character to unlock secret/hidden boss)");
        $('.luke-boy').attr("src","assets/images/luke_master.png");
        $('.luke-name').text("Master Luke");
        $('#message2-display').css("color","white").text("");
    } else if (score > 3) {
        $('#message-display').css("color","white").text("Game is really over. Please restart game");
        $('#message2-display').css("color","white").text("Hope you enjoyed the game. Don't forget to like and subscribe for more Jedi news!");
    }    
    
}

// attack button will run attack function function when clicked
$("#attack").on("click", function() {
    attack();
});

// reset button will run initialize function when clicked
  $("#restart").on("click", function() {
      initializeGame();
    });


// Endor button will change jumbotron background image and audio 
$("#Endor").on("click", function() {
    $(".jumbotron").css("background-image","url('assets/images/endor.jpg')");
    audio = new Audio('./assets/audio/Endor.mp3');
    audio.play();
});

// Deathstar button will change jumbotron background image and audio 
$("#Death-Star").on("click", function() {
    $(".jumbotron").css("background-image","url('assets/images/deathstarbck.jpg')");
    audio = new Audio('./assets/audio/ImperialMarch.mp3');
    audio.play();
});

  // kumite button will change jumbotron background image and audio 
$("#Kumite").on("click", function() {
    $(".jumbotron").css("background-image","url('assets/images/kumite.jpg')");
    audio = new Audio('./assets/audio/kumite.mp3');
    audio.play();
});


// Cantina button will change jumbotron background image and audio 
$("#Cantina").on("click", function() {
    $(".jumbotron").css("background-image","url('assets/images/cantina.jpg')");
    audio = new Audio('./assets/audio/cantina.mp3');
    audio.play();
});

    // Enter keypress to start game, clear intro animation divs, show characters 
$("body").keypress(function (e) {
    if (event.key == "Enter"){
    $(".introcontainer").css("display","none");
    $(".press-enter").css("display","none");
    $(".swcharacter").css("display","block");
    $('#Master-Luke').css("display","none");
    }
  });


initializeGame();
selectCharacter();
});