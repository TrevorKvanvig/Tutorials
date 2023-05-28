let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []
let randomColor = ""
let started = false
let level = 0
let userPatternIndex = 0

function startOver(){
    gamePattern = []
    userPattern = []
    randomColor = ""
    started = false
    level = 0
    userPatternIndex = 0
    setTimeout(function(){
       $("h1").text("Press A Key to Start") 
    }, 1500)
    
}

function gameOver(){
    $("h1").text("GAME OVER")
    audio = new Audio("sounds/wrong.mp3")
    audio.play()
    $("body").toggleClass("game-over")
    setTimeout(function(){
        $("body").toggleClass("game-over")
    }, 200)
    startOver()
}


$(".btn").on("click", function(e){
    userColor = this.id
    userPattern.push(userColor)
    buttonClick(userColor)
    console.log("User Pattern =>", userPattern)
    console.log("Game Pattern =>", gamePattern)
    checkInput()
    if(gamePattern[userPatternIndex] != userPattern[userPatternIndex]){
        gameOver()
    }
    userPatternIndex++
})


function buttonClick(color){
    $(`.${color}`).toggleClass("pressed")
    setTimeout(function(){
        $(`.${color}`).toggleClass("pressed")

    }, 100)
    switch (color) {
        case "red":
            redAudio = new Audio("sounds/red.mp3")
            redAudio.play()
            break;
        case "green":
            greenAudio = new Audio("sounds/green.mp3")
            greenAudio.play()
            break;
        case "yellow":
            yellowAudio = new Audio("sounds/yellow.mp3")
            yellowAudio.play()
            break;
        case "blue":
            blueAudio = new Audio("sounds/blue.mp3")
            blueAudio.play()
            break;
        default:
            break;
    }
    
}

function generateColor(){
    // generate random number
    min = Math.ceil(0);
    max = Math.floor(4);
    randomNum = Math.floor(Math.random() * (max - min) + min)

    // change random number to color
    randomColor = buttonColors[randomNum]
}

function nextSequnce(){
    if(started == true){
       generateColor()
        gamePattern.push(randomColor)
    
        buttonClick(randomColor);
        // update level
        $("h1").text("LEVEL " + level )
        level++

        console.log("User Pattern =>", userPattern)
        console.log("Game Pattern =>", gamePattern) 
    }
    
}

$(document).on("keypress", function(e){

    if (started == false){
        started = true
        nextSequnce()
        
    }
    
})

function checkInput(){
    if (started == true){
        console.log(gamePattern.length);
        console.log(gamePattern.length);

        if(userPattern === gamePattern){
            console.log("same")
        }
        if(gamePattern.length == userPattern.length){
            
            setTimeout(function(){
                
                userPattern = []
                userPatternIndex = 0
                nextSequnce()
                
            }, 1500)
        }
    }
}