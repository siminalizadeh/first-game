'use strict';
// document.getElementById('score--0').textContent=0
// document.getElementById('score--1').textContent=0
// document.querySelector('.dice').classList.add('hidden')

//SElelecting ellements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
 player0El.classList.remove('player--winner')
 player1El.classList.remove('player--winner')
};
init()

//ROLLING DICE FUNCTIONALLITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1
    if (dice !== 1) {
      //add dice number to current score
      currentScore = currentScore + dice;
      // currentScore+=dice
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // swith to next player
      switchPlayer();
    }
  }
});

//holding score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. ADD CURRENT SCORE TO ACTIVE PLAYER SCORE
    scores[activePlayer] += currentScore;
    // scores[activePlayer]=scores[activePlayer]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. CHECK IF PLAYER'S SCORE >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3. SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

//reset the game
btnNew.addEventListener('click', init);
