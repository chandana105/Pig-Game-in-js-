/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// PIG GAME

var scores, roundScore, activePlayer, gamePlaying;

// calling the first fxn
init();

// step 2 rolling dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1.Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    // console.log(dice);
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the roundscore only if the rolled socre was NOT 1
    if (dice !== 1) {
      // Add to score ie roundscore

      roundScore += dice;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next Players turn
      nextPlayer();
    }
  }
});

// step 3 holding button
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT SCORE to global score
    scores[activePlayer] += roundScore;
    // console.log(scores[activePlayer]); ab yehi thing ui mein update krna

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game or not
    if (scores[activePlayer] >= 20) {
      // dispy the name of wnner
      document.getElementById('name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
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

  document.querySelector('.dice').style.display = 'none';
}

// step 4  claaling the init to start new game
document.querySelector('.btn-new').addEventListener('click', init);

// initilized fxn -step 1
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // var gamePlaying = true;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

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
