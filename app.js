//  Nicholas Osterfelt
//  Springboard Memory Game Excercise
//  3/10/2020

const gameBox = document.querySelector('.game-box');
const coin = document.querySelector('.coin');
const highScoreBoard = document.querySelector('h2');
const startText = document.querySelector('p');
const mainMenu = document.querySelector('.main-menu')
const scoreBoard = document.querySelector('h3');
const cards = document.querySelectorAll('.card');
const cardFronts = document.querySelectorAll('.card-front')

let firstPick = null;
let secondPick = null;

let indices = [];
let srcList = [];
let score = 0;
let highScore = 0;
let successCount = 0;

startGame();

function startGame(){ 
    attachEventListeners();
    prepareCards();
}

//attaches all required event listeners in one function!
function attachEventListeners(){
    for(card of cards)
    {
        card.addEventListener('click', flip);

    }
    //coin clicks
    coin.addEventListener('click', function(e){
        fadeOut(mainMenu);
        fadeIn(gameBox);
        fadeIn(scoreBoard);
        e.target.removeEventListener('click', fadeOut);
    });
}
//assigns card-front html classes with random img src's, and flips cards over in case of new game.
function prepareCards(){
    for(card of cards){
        card.classList.remove('card-flip');
    }
    for(let i = 1; i <= 9; i++){
        srcList.push(`images/img${i}.png`);
        srcList.push(`images/img${i}.png`);
    }
    shuffle(srcList);
    for(img of cardFronts){
        img.src = srcList.pop();
    }
}
//most of game logic in pick function
//checks whether the card that was clicked on is the first or second card, and whether they are a match, and if so if the game has been completed
function pick(e){
    if(firstPick === null){
        score++;
        firstPick = e.target.parentElement;       
    }
    else if(secondPick === null){
        score++;
        secondPick = e.target.parentElement;
        if((firstPick.children[1].src === secondPick.children[1].src))
        {
            successCount++;
            if(successCount == cards.length/2){
                endGame();
            }
            firstPick = null;
            secondPick = null;
        }
        else{
            setTimeout(function(){
                firstPick.classList.remove("card-flip");
                secondPick.classList.remove("card-flip");
                firstPick = null;                               //if not a match, flips the cards back over and resets first and second picks.
                secondPick = null;}, 
            1000);
        }
    }
    updateScore();
}
//resets game and updates highscore for second playthrough
function endGame(){
    if(score > highScore)
    {
        highScore = score;
        updateHighScore();
    }
    score = 0;
    updateScore();
    fadeIn(mainMenu);
    fadeOut(gameBox);
    fadeOut(scoreBoard);
    prepareCards();
}

//helper functions
function flip(e){
    if(e.target.parentElement.classList.contains("card")){    //using flip helper function avoids adding duplicate event listeners with anonymous functions
        e.target.parentElement.classList.add('card-flip');
        pick(e);                                        
    }
}   
function shuffle(arr){      //Durstenfeld shuffle algorithm
    for(let i = arr.length -1; i > 0; i--){
        let newIndex = Math.floor(Math.random() * (i+1));
        let temp = arr[i]; 
        arr[i] = arr[newIndex]  
        arr[newIndex] = temp;
    }
}
function updateScore(){
    scoreBoard.querySelector('#current-score').innerText = score;
}
function updateHighScore(){
    highScoreBoard.querySelector('#high-score').innerText = highScore;
}
function fadeOut(elmnt)
{
    elmnt.classList.toggle('fade-in');
    elmnt.classList.toggle('fade-out');
}
function fadeIn(elmnt)
{
    elmnt.classList.toggle('fade-out');
    elmnt.classList.toggle('fade-in')
    
}

