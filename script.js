const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],       // Rows
  [0,3,6], [1,4,7], [2,5,8],       // Columns
  [0,4,8], [2,4,6]                 // Diagonals
];

function renderBoard() {
  boardEl.innerHTML = ""; // Clear board
  board.forEach((cell, idx) => {
    const cellEl = document.createElement("div");
    cellEl.className = "w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer hover:bg-gray-700";
    cellEl.textContent = cell;
    cellEl.addEventListener("click", () => handleClick(idx));
    boardEl.appendChild(cellEl);
  });
}

function handleClick(index) {
  if (!gameActive || board[index] !== "") return;
  board[index] = currentPlayer;
  renderBoard();
  checkResult();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkResult() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusEl.textContent = `🎉 Player ${board[a]} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusEl.textContent = "It's a draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = "Player X's turn";
  renderBoard();
}

renderBoard(); // Initial board load
