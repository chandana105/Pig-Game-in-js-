/*
New rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// PIG GAME

var scores, roundScore, activePlayer, gamePlaying, lastDice;

// calling the first fxn
init();

// step 2 rolling dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1.Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // console.log('dice' + dice)

    //2. Display the result
    // console.log(dice);
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the roundscore only if the rolled socre was NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add to score ie roundscore

      roundScore += dice1 + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next Players turn
      nextPlayer();
    }
  }
});

// we ll declare last dice fxn inside the global scope as when the fxn returns of rolling dice it ll lost the vlaues if last dice declared inside so we l declare in global scope

// step 3 holding button
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT SCORE to global score
    scores[activePlayer] += roundScore;
    // console.log(scores[activePlayer]); ab yehi thing ui mein update krna

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    // console.log(input);

    // ubdefined, null, 0 , '' coerced to false
    // Anything else will be coerced to true

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // check if player won the game or not
    if (scores[activePlayer] >= winningScore) {
      // dispy the name of wnner
      document.getElementById('name-' + activePlayer).textContent = 'Winner';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// if 1 or hold next plyer turn
function nextPlayer() {
  // Next Players turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); // 0 tha 1 ki turn hogi
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// step 4 callinit for  new game
document.querySelector('.btn-new').addEventListener('click', init);

// initilized fxn -step 1
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // var gamePlaying = true;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  // at the starting scores ll be zero
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
