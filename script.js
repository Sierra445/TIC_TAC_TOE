const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;

// Initialize board
const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

// Create the grid
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = i;
    cell.dataset.col = j;
    cell.innerText = '';
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  }
}

function handleCellClick(e) {
  if (!gameActive) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  if (board[row][col] !== ' ') {
    alert('Cell already taken!');
    return;
  }
  // Update local board
  board[row][col] = currentPlayer;
  e.target.innerText = currentPlayer;

  // Check for game over
  if (checkWinner()) {
    messageElement.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (checkDraw()) {
    messageElement.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  // Rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer &&
      board[i][1] === currentPlayer &&
      board[i][2] === currentPlayer
    ) {
      return true;
    }
  }
  // Columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === currentPlayer &&
      board[1][j] === currentPlayer &&
      board[2][j] === currentPlayer
    ) {
      return true;
    }
  }
  // Diagonals
  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    return true;
  }
  return false;
}

function checkDraw() {
  for (let row of board) {
    if (row.includes(' ')) return false;
  }
  return true;
}