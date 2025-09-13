let squares = document.querySelectorAll(".playing-field__square");
let resetButton = document.querySelector(".button--restart");
let result = document.querySelector(".result");
const cross = "X";
const zero = "O";
const classCross = "playing-field__square--cross";
const classZero = "playing-field__square--zero";
let currentPlayer = cross;
let currentPlayerClass = classCross;
let hover = document.querySelector(".playing-field__square:hover");
const gameName = document.querySelector(".game-name");

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
  resetButton.addEventListener("click", resetGame);
}

function handleClick(event) {
  const squareIndex = parseInt(event.getAttribute("data-cell-index"));
  if (fieldStatus[squareIndex] !== "" || !gameActive) {
    return;
  }

  fieldStatus[squareIndex] = currentPlayer;
  event.classList.add(currentPlayerClass);
  gameName.replaceWith(resetButton);
  resetButton.style.visibility = "visible";
  if (isWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === cross ? zero : cross;
    currentPlayerClass =
      currentPlayerClass === classZero ? classCross : classZero;
  }
}
function isWin() {
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

function isDraw() {
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
  currentPlayer = cross;
  gameActive = true;
  fieldStatus = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.classList.remove(
      "playing-field__square--cross",
      "playing-field__square--zero"
    );
    result.textContent = "Result";
    resetButton.replaceWith(gameName);
    resetButton.style.visibility = "hidden";
  });
}
