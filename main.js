let squares = document.querySelectorAll(".playing-field__square");
let restartButton = document.querySelector(".button--restart");
let result = document.querySelector(".result");
let currentPlayer = "X";
let currentPlayerClass = "playing-field__square--cross";

let gameActive = true;
let fieldStatus = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initGames();

function initGames() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("playing-field__square")) {
      handleClick(event.target);
    }
  });
  restartButton.addEventListener("click", resetGame);
}

function handleClick(event) {
  const squareIndex = parseInt(event.getAttribute("data-cell-index"));
  if (fieldStatus[squareIndex] !== "" || !gameActive) {
    return;
  }
  fieldStatus[squareIndex] = currentPlayer;
  event.classList.add(currentPlayerClass);

  if (checkWin()) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerClass =
      currentPlayerClass === "playing-field__square--zero"
        ? "playing-field__square--cross"
        : "playing-field__square--zero";
  }
}
function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      fieldStatus[a] &&
      fieldStatus[a] === fieldStatus[b] &&
      fieldStatus[a] === fieldStatus[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !fieldStatus.includes("");
}

function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    result.textContent = "Game ended in a draw!";
  } else {
    result.textContent = `${currentPlayer} wins!`;
  }
}

function resetGame() {
  currentPlayer = "O";
  gameActive = true;
  fieldStatus = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.classList.remove(
      "playing-field__square--cross",
      "playing-field__square--zero"
    );
  });
}
