const game = document.getElementById('game');
const star = document.getElementById('star');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');
let score = 0;
let gameEnded = false;
const timeRemainingDisplay = document.getElementById('time-remaining');
let timeRemaining = 10;
let timer;

function getRandomPosition() {
  const x = Math.floor(Math.random() * (game.clientWidth - star.clientWidth));
  const y = Math.floor(Math.random() * (game.clientHeight - star.clientHeight));
  return { x, y };
}

function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('star-trail');
  trail.textContent = '⭐';
  trail.style.left = x + 'px';
  trail.style.top = y + 'px';
  game.appendChild(trail);

  setTimeout(() => {
    game.removeChild(trail);
  }, 1000);
}

function moveStar() {
  const position = getRandomPosition();

  // Create a trail element at the star's current position
  createTrail(star.offsetLeft, star.offsetTop);

  star.style.left = position.x + 'px';
  star.style.top = position.y + 'px';
}

function updateScore() {
  scoreDisplay.textContent = 'Score: ' + score;
}

function endGame() {
  gameEnded = true;
  clearInterval(timer);
  alert('Game over! Your score is: ' + score);
}

function updateRemainingTime() {
  timeRemainingDisplay.textContent = 'Time: ' + timeRemaining + 's';
}

function startGame() {
  score = 0;
  gameEnded = false;
  timeRemaining = 10;
  updateScore();
  updateRemainingTime();
  moveStar();

  // Clear previous timer if it exists
  if (timer) {
    clearInterval(timer);
  }

  // Use setInterval to update the remaining time every second
  timer = setInterval(() => {
    timeRemaining--;
    updateRemainingTime();

    if (timeRemaining === 0) {
      endGame();
    }
  }, 1000);
}

star.addEventListener('click', () => {
  if (!gameEnded) {
    score++;
    updateScore();
    moveStar();
  }
});

restartButton.addEventListener('click', () => {
  if (!gameEnded) {
    endGame();
  }
  startGame();
});

startGame();
