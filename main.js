let squares = document.querySelectorAll(".playing-field__square");
let playingField = document.querySelector(".playing-field");
let resetButton = document.querySelector(".button-restart");
let result = document.querySelector(".result");
const crossSymbol = "X";
const zeroSymbol = "O";
const crossClass = "playing-field__square--cross";
const zeroClass = "playing-field__square--zero";
let currentPlayerSymbol = crossSymbol;
let currentPlayerClass = crossClass;

const gameName = document.querySelector(".game-name");

let gameActive = true;
const fieldStatus = ["", "", "", "", "", "", "", "", ""];
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
let copyFieldStatus = [...fieldStatus];

initGames();

function initGames() {
  playingField.addEventListener("click", function (event) {
    if (event.target.classList.contains("playing-field__square")) {
      handleClick(event.target);
    }
  });
  resetButton.addEventListener("click", resetGame);
}

function handleClick(fieldCell) {
  const squareIndex = parseInt(fieldCell.getAttribute("data-cell-index"));
  if (copyFieldStatus[squareIndex] !== "" || !gameActive) {
    return;
  }

  copyFieldStatus[squareIndex] = currentPlayerSymbol;
  fieldCell.classList.add(currentPlayerClass);
  gameName.replaceWith(resetButton);
  resetButton.style.visibility = "visible";
  if (isWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    currentPlayerSymbol =
      currentPlayerSymbol === crossSymbol ? zeroSymbol : crossSymbol;
    currentPlayerClass =
      currentPlayerClass === zeroClass ? crossClass : zeroClass;
  }
}
function isWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      copyFieldStatus[a] &&
      copyFieldStatus[a] === copyFieldStatus[b] &&
      copyFieldStatus[a] === copyFieldStatus[c]
    ) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  return !copyFieldStatus.includes("");
}

function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    result.textContent = "Game ended in a draw!";
  } else {
    result.textContent = `${currentPlayerSymbol} wins!`;
  }
}

function resetGame() {
  currentPlayerSymbol = crossSymbol;
  gameActive = true;
  copyFieldStatus = ["", "", "", "", "", "", "", "", ""];
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
