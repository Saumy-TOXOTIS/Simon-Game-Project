var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(document).on("keypress",function()
{
    if(level === 0)
    {
        nextSequence();
        $("h1").text("Level " + level);
    }
});

$(".btn").on("click",function()
{
    var userChoosenColor = $(this).attr("id");
    
    var audio = new Audio("sounds/" + userChoosenColor + ".mp3");
    audio.play();
    
    animatePress(userChoosenColor);
    
    userClickedPattern.push(userChoosenColor);

    if(level != 0)
    {
        checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
}

function nextSequence()
{
    userClickedPattern = [];
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChoosenColor);
    
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    audio.play();
    
    level++;
    $("h1").text("Level " + level);
}

function animatePress(currentColor)
{
    $("#" + currentColor).removeClass("not-moving");
    setTimeout(function(){
        $("#" + currentColor).addClass("not-moving");
    },200);
}