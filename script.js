'use strict';
$(document).ready(function () {
  //selecting elements
  const player0El = $('.player--0');
  const player1El = $('.player--1');
  const score0El = $('#score--0');
  const score1El = $('#score--1');
  const currScore0El = $('#current--0');
  const currScore1El = $('#current--1');
  const diceEl = $('.dice');
  const btnNew = $('.btn--new');
  const btnRoll = $('.btn--roll');
  const btnHold = $('.btn--hold');
  let play;
  let currentScore;
  let whoPlays;
  let scores;
  function init() {
    score0El.text(0);
    score1El.text(0);
    diceEl.addClass('hidden');
    play = true;
    currentScore = 0;
    whoPlays = 0;
    scores = [0, 0];
    currScore0El.text(0);
    currScore1El.text(0);
    player0El.addClass('player--active');
    player1El.removeClass('player--active');
    player1El.removeClass('player--winner');
    player0El.removeClass('player--winner');
  }
  init();
  //rolling dice functionallity
  btnRoll.on('click', () => {
    if (play) {
      //1.generating random dice roll
      const dice = Math.ceil(Math.random() * 6);
      console.log(dice);
      //2.display dice
      diceEl.removeClass('hidden');
      diceEl.attr('src', `dice-${dice}.png`);
      //3.check for rolled 1
      if (dice !== 1) {
        currentScore += dice;
        $(`#current--${whoPlays}`).text(currentScore);
      } else {
        switchPlayer();
      }
    }
  });

  btnHold.on('click', () => {
    if (play) {
      scores[whoPlays] += currentScore;
      $(`#score--${whoPlays}`).text(scores[whoPlays]);
      if (scores[whoPlays] >= 100) {
        play = false;
        diceEl.addClass('hidden');
        $(`.player--${whoPlays}`).addClass('player--winner');
        $(`.player--${whoPlays}`).removeClass('player--active');
      } else {
        switchPlayer();
      }
    }
  });

  btnNew.on('click', init);

  function switchPlayer() {
    $(`#current--${whoPlays}`).text(0);
    currentScore = 0;
    whoPlays === 0 ? (whoPlays = 1) : (whoPlays = 0);
    player0El.toggleClass('player--active');
    player1El.toggleClass('player--active');
  }
});
