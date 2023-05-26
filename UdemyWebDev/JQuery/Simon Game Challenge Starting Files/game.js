let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []
let randomColor = ""
let started = false
let level = 0

function nextSequnce(){
    min = Math.ceil(0);
    max = Math.floor(4);
    randomNum = Math.floor(Math.random() * (max - min) + min)
    randomColor = buttonColors[randomNum]
    gamePattern.push(randomColor)
    $("h1").text("LEVEL " + level )
    level++
    return buttonColors[randomNum]
}

$(document).on("keypress", function(e){
    if (started == false){
        nextSequnce()
        buttonClick(randomColor) 
    }
    started = true
})

$(".btn").on("click", function(e){
    console.log("clicked");
    userColor = this.id
    userPattern.push(userColor)
    buttonClick(userColor)
    console.log(userPattern);
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

function animatePress(color){

}