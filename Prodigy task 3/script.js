const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';  // Start with player X
let gameState = ['', '', '', '', '', '', '', '', ''];  // Array to track the state of each cell
let isGameActive = true;

// Function to handle cell click
function handleClick(event) {
  const index = event.target.dataset.index;

  if (gameState[index] !== '' || !isGameActive) return;  // Don't do anything if the cell is already clicked or the game is over

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    isGameActive = false;
  } else if (gameState.every(cell => cell !== '')) {
    setTimeout(() => alert('It\'s a draw!'), 100);
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch player
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
    [0, 4, 8], [2, 4, 6]               // Diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }

  return false;
}

// Function to restart the game
function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');  // Clear the board
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);

