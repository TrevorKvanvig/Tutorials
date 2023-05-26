buttonNum = document.querySelectorAll(".drum").length;

for(let i = 0; i < buttonNum; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        var buttonInnerH = this.innerHTML;
        detectKey(buttonInnerH)
        animator(buttonInnerH)
    })
}

document.addEventListener("keydown", function(e){
    detectKey(e.key)
    animator(e.key)
});

function detectKey(key){
    switch (key) {
        case "w":
            var audio = new Audio("sounds/crash.mp3")
            audio.play()
            break;
        case "a":
            var audio = new Audio("sounds/kick-bass.mp3")
            audio.play()
            break;
        case "s":
            var audio = new Audio("sounds/snare.mp3")
            audio.play()
            break;
        case "d":
            var audio = new Audio("sounds/tom-1.mp3")
            audio.play()
            break; 
        case "j":
            var audio = new Audio("sounds/tom-2.mp3")
            audio.play()
            break;
        case "k":
            var audio = new Audio("sounds/tom-3.mp3")
            audio.play()
            break;
        case "l":
            var audio = new Audio("sounds/tom-4.mp3")
            audio.play()
            break;
        default:
            console.log("drum switch error")
            break;
    }
}

function animator(key){
    activeB = document.querySelector("." + key)
    activeB.classList.add("pressed")
    setTimeout(function(){
        activeB.classList.remove("pressed")
    }, 10);
}