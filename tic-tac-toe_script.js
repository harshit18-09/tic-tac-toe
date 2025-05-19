const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.textContent = cell;
    cellEl.addEventListener("click", () => handleClick(index));
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
  for (let combo of winCombos) {
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

renderBoard();
