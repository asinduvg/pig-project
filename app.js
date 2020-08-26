/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
var previousValue = 0;

init();

// dice = Math.floor(Math.random() *6) + 1;

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var diceDOM1 = document.getElementById('dice-1');
    var diceDOM2 = document.getElementById('dice-2');

    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    if(dice1 === 1 || dice2 === 1) {
      clickChange();
      diceDOM1.style.display = 'none';
      diceDOM2.style.display = 'none';
    }else if(previousValue === 6 && (dice1 + dice2) === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      clickChange();
    }else {
      roundScore += (dice1 + dice2);
    }
    previousValue = (dice1 + dice2);

    document.querySelector('#current-'+ activePlayer).textContent = roundScore;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
      scores[activePlayer] += roundScore;
      document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];
      var finalVal = document.querySelector('.final-score-text-box').value;

      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('#dice-2').style.display = 'none';
      if(scores[activePlayer] >= finalVal) {
        document.getElementById('name-' + activePlayer).textContent = 'Won';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gamePlaying = false;
      }else {
        clickChange();
      };
    }
});

function clickChange() {
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  dice1 = 0;
  dice2 = 0;

  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';
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

document.querySelector('.btn-new').addEventListener('click', init);  // scores[0, 0];
  // roundScore = 0;
  // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
  // document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
  // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  // document.querySelector('.player-0-panel').classList.add('active');
  // document.getElementById('player-current-score').textContent = '0';
  // document.querySelector('.player-score').textContent = '0';
  // activePlayer = 0;
