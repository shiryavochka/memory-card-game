const cards = document.querySelectorAll('.memory-card');
const losing = document.querySelector('.lose-game');
const won = document.querySelector('.winn-game');
const timerBlock = document.querySelector('.timer');
const startBut = document.querySelector('.start-button');

let hasFlippedCard  = false;
let firstCard, secondCard; 
let lockCards= false; 


startBut.addEventListener('click',startingGame );


function startingGame () {
    startBut.disabled = true;
    startBut.classList.add('disabled');
    won.classList.remove('shown');
    losing.classList.remove('shown');
    
    cards.forEach (card => card.addEventListener ('click', cardFlip));
    startTimer(); 
    
}


function finishGame() {
    cards.forEach(card => (card.classList.remove('flip'))); 
    startBut.disabled = false;
    startBut.classList.remove('disabled');  
}


function startTimer () {
    timeMinut = 1 * 60;

    const timer = setInterval( function () {
    seconds = timeMinut%60;
    minutes = timeMinut/60%60;

        if (timeMinut <= 0) {
            clearInterval(timer);
            resetBoard();
            finishGame();
            losing.classList.add('shown');        

        } else {
            let strTimer = `${Math.trunc(minutes)}:${seconds}`;
            timerBlock.innerHTML = strTimer;
        }
    --timeMinut;
    }, 1000)

    const victory = setInterval( function( ) {
        if (!document.querySelectorAll('.memory-card:not(.flip)').length) {
            won.classList.add('shown');
            clearInterval(timer);
            console.log(timer);
            setTimeout(() => clearInterval(victory));
            finishGame();
        
            return;        
    }} , 2000);       
}

function cardFlip () {
    if (lockCards) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
      
      secondCard = this;
      lockCards=true;
      hasFlippedCard = false;
      cardMatch();

}

function cardMatch () {

    if(firstCard.dataset.card===secondCard.dataset.card)
    {
        disableCards();
        return;
    }
    unFlip();
 

}

function disableCards ( ) {
    firstCard.removeEventListener('click', cardFlip);
    secondCard.removeEventListener('click', cardFlip);
    resetBoard();
}

function unFlip () {
    lockCards= true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 1500);
     
}

function resetBoard() {
    [hasFlippedCard, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
  
}

(function shuffle () {
    cards.forEach (card => {
    let positionRandom = Math.floor(Math.random()*18);
    card.style.order = positionRandom;
});
})();
