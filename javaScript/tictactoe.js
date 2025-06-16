const gridOne = document.querySelector(".gridblockOne"); //alle blokken opgehaald van de grid
const gridTwo = document.querySelector(".gridblockTwo");
const gridThree = document.querySelector(".gridblockThree");
const gridFour = document.querySelector(".gridblockFour");
const gridFive = document.querySelector(".gridblockFive");
const gridSix = document.querySelector(".gridblockSix");
const gridSeven = document.querySelector(".gridblockSeven");
const gridEight = document.querySelector(".gridblockEight");
const gridNine = document.querySelector(".gridblockNine");
const playButton = document.querySelector(".pvp");

let options = ["", "", "", "", "", "", "", "", ""]; //alle opties
let currentPlayer = "X"; //player1
let gameStarted = false; //game begint op false

const feedback = document.createElement("div"); //dit maakt een div element die als feedback is bijv het is X zijn beurt enzo
feedback.innerHTML = `<p class='feedback'><p>` //class gemaakt van de feedback
feedback.style.color = "white" //css voor feedback hierzo
feedback.style.fontSize = "20px"
feedback.style.textAlign = "center"
feedback.style.marginTop = "20px"
feedback.textContent = "Press play to start"; //dit staat er als je nog niet hebt geklikt
document.body.appendChild(feedback); //select de feedback en voegt het toe op het scherm

//je kan niks klikken pas als je op play hebt geklikt
const grids = [gridOne, gridTwo, gridThree, gridFour, gridFive, gridSix, gridSeven, gridEight, gridNine];
for (let i = 0; i < grids.length; i++) { 
    grids[i].style.pointerEvents = "none"; //je kan ze niet klikken
}

let playerScore1 = 0; //score players 
let playerScore2 = 0;

playButton.addEventListener('click', function() {
    let soundFx = new Audio('tictactoeSFX/game-start-6104.mp3'); //sound effect
    soundFx.play();
    gameStarted = true; //spel is begonnen
    feedback.textContent = "It's X's turn (^-^)"; //de beurt van X  
    playButton.style.display = "none"; //play knop gaat weg

    const nameAnimation = document.querySelector('.playerName2'); //dit is allemaal voor een kleine aniamtionn
    const scoreAnimation = document.querySelector('.score2');

    setTimeout(() => { //delay
        nameAnimation.style.paddingLeft = "600px"; //padding laat het bewegen
        scoreAnimation.style.paddingLeft = "600px"; //zelfde hier
    }, 500);

    const playerName1 = prompt("Player 1 name"); //naam invoeren
    const playerName2 = prompt("Player 2 name");

    document.querySelector('.playerName1').textContent = `Player X: ${playerName1}`; //namen komen op het scherm
    document.querySelector('.playerName2').textContent = `Player O: ${playerName2}`;
    document.querySelector('.score1').textContent = `Score: ${playerScore1}`; //score op scherm
    document.querySelector('.score2').textContent = `Score: ${playerScore2}`;
    
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.pointerEvents = "auto"; //je kan de grids klikken
    }
});

//dit is hoe de spel zelf werkt soort van
for (let i = 0; i < grids.length; i++) { 
    grids[i].addEventListener('click', function() { //als je een grid klikt dan 
        if (options[i] === "" && gameStarted) { //als je een grid hebt geklikt en game is started dan
            options[i] = currentPlayer; //is het de beurt van de andere speler
            grids[i].textContent = currentPlayer; //wisselt van spelers
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X"; //wisselt speler
            feedback.textContent = "It's " + currentPlayer + "'s turn"; //feedback over wiens beurt het is
            let soundFx = new Audio('tictactoeSFX/blip-131856.mp3');
            soundFx.play();
        }
    });
}

function checkWinner() {  //alle manieren waarop je kan winnen/winpatronen
    const winPatterns = [
        [gridOne, gridTwo, gridThree],
        [gridFour, gridFive, gridSix],
        [gridSeven, gridEight, gridNine],
        [gridOne, gridFour, gridSeven],
        [gridTwo, gridFive, gridEight],
        [gridThree, gridSix, gridNine],
        [gridOne, gridFive, gridNine],
        [gridThree, gridFive, gridSeven]
    ];

    for (let i = 0; i < winPatterns.length; i++) {  //array van winpatronen hoe je kan winnen
        const [win1, win2, win3] = winPatterns[i]; //je hebt winpatroon 1 2 en 3
        if (win1.textContent === currentPlayer && win2.textContent === currentPlayer && win3.textContent === currentPlayer) { //feedback als je wint
            let soundFx = new Audio('tictactoeSFX/good-6081.mp3');
            soundFx.play();
            alert(currentPlayer + " has won this round! ~(≧▽≦)~"); //alert wanneer je wint
            
            if (currentPlayer === "X") {
                playerScore1++; //X score omhoog
                document.querySelector('.score1').textContent = `Score: ${playerScore1}`; //score verandert op scherm
            } else {
                playerScore2++; //O score omhoog
                document.querySelector('.score2').textContent = `Score: ${playerScore2}`; //score verandert op scherm
            }

            resetRound(); //reset de ronde

            if (playerScore1 === 5 || playerScore2 === 5) { //als een speler 5 punten heeft wint diegene
                let soundFx = new Audio('tictactoeSFX/goodresult-82807.mp3');
                soundFx.play();
                alert(currentPlayer + " has won the game! (^-^)"); //winnaar
                gameStarted = false; //spel is afgelopen
                resetGame(); //reset alles
            }
            return;
        }
    }
    
    if (!options.includes("")) { //als er geen lege grids zijn is het gelijkspel
        let soundFx = new Audio('tictactoeSFX/classic-game-action-negative-25-224584.mp3');
        soundFx.play();
        alert("It's a draw (⩾﹏⩽)");
        resetRound(); //reset bord voor nieuwe ronde
    }
}

function resetRound() { //reset alles voor nieuwe ronde
    options = ["", "", "", "", "", "", "", "", ""]; //reset alle kruizen en cirkels
    for (let i = 0; i < grids.length; i++) {
        grids[i].textContent = ""; //grid is leeg
    }
}

function resetGame() { //game word gerest als je wint
    playerScore1 = 0; //score reset
    playerScore2 = 0;
    document.querySelector('.score1').textContent = `Score: ${playerScore1}`; //score reset op scherm
    document.querySelector('.score2').textContent = `Score: ${playerScore2}`;
    resetRound(); //reset grid
    playButton.style.display = "block"; //play knop terug
    feedback.textContent = "Press play to start"; //feedback weer normaal
}