'use strict';
// Selecting Elments
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting  Conditions
// Declearing Global Variables
let scores, currentScore, activePlayer, playing;

const initializeGame = () => {
  // Reasigning the global variable
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.add('player--active');
};

initializeGame();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

rollDice.addEventListener('click', function () {
  if (playing) {
    // Generate Dice Functionality
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // Check;
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // Current0El.textContent = currentScore;
    } else {
      // Switch to next Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score >= 100
    // Finish the Game

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player

      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initializeGame);
