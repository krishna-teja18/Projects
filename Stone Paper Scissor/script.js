const rulesBtn = document.getElementById("rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closeBtn = document.getElementById("close-btn");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const playAgainBtn = document.getElementById("play-again");
const gameOptionsEl = document.querySelector(".game-options");
const linesEl = document.querySelector(".lines");
const nextBtn = document.getElementById("next-btn");

let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

playerScoreEl.textContent = playerScore;
computerScoreEl.textContent = computerScore;

function checkNextButton() {
  if (playerScore > computerScore) {
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.add("hidden");
  }
}

checkNextButton();

const options = document.querySelectorAll(".option");
const choices = ["rock", "paper", "scissors"];

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    // console.log(e)
    const emoji = e.target.innerHTML;
    playerChoice = getChoice(emoji);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(playerChoice, computerChoice);

    gameOptionsEl.classList.add("hidden");
    linesEl.classList.add("hidden");

    showResult(playerChoice, computerChoice, winner);
    updateScore(winner);
    saveScore();
    checkNextButton();
  });
});

// playAgainBtn.addEventListener("click", resetGame);

function getWinner(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  }
  return "computer";
}

function showResult(playerChoice, computerChoice, winner) {
  const playerEmoji = getEmoji(playerChoice);
  const computerEmoji = getEmoji(computerChoice);

  resultEl.innerHTML = `
        <div class="winner">
          <div class="player">
            <h3>YOU PICKED</h3>
            <div class="options">${playerEmoji}</div>
          </div>
          <div class="computer">
            <h3>PC PICKED</h3>
            <div class="options">${computerEmoji}</div>
          </div>
          <h2>${
            winner === "tie"
              ? "TIE UP"
              : winner === "player"
              ? "YOU WIN AGAINST PC"
              : "YOU LOST AGAINST PC"
          }</h2>
          <button id="play-again">
            ${winner === "tie" ? "Replay" : "Play Again"}
          </button>
        </div>
    `;

  if (winner === "player") {
    document.querySelector(".player .options").classList.add("winner");
  } else if (winner === "computer") {
    document.querySelector(".computer .options").classList.add("winner");
  }

  const playAgainBtn = document.getElementById("play-again");
  playAgainBtn.addEventListener("click", resetGame);
}

function displayWinnerScreen() {
  const winnerScreenHTML = `
      <div class="winner-screen" id="winner-screen">
        <div class="winner-content">
          <div class="trophy">🏆</div> <!-- Placeholder for the trophy -->
          <h1>HURRAY!!</h1>
          <p>YOU WON THE GAME</p>
          <button id="play-again-btn">PLAY AGAIN</button>
          <button class="rules-btn" id="rules-btn">RULES</button>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML("beforeend", winnerScreenHTML);

  document.getElementById("play-again-btn").addEventListener("click", () => {
    resetGame();
    localStorage.setItem("playerScore", 0);
    localStorage.setItem("computerScore", 0);
    document.getElementById("winner-screen").remove();
  });
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else if (winner === "computer") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
}

function saveScore() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

function resetGame() {
  resultEl.innerHTML = "";

  const playAgainBtn = document.getElementById("play-again");
  if (playAgainBtn) {
    playAgainBtn.remove();
  }

  gameOptionsEl.classList.remove("hidden");
  linesEl.classList.remove("hidden");

  const winnerOptions = document.querySelectorAll(".winner");
  winnerOptions.forEach((option) => option.classList.remove("winner"));
}

nextBtn.addEventListener("click", () => {
//   alert("Next level will be added!");
  displayWinnerScreen();
});

function getEmoji(choice) {
  switch (choice) {
    case "rock":
      return "✊";
    case "paper":
      return "✋";
    case "scissors":
      return "✌️";
  }
}

function getChoice(emoji) {
  switch (emoji) {
    case "✊":
      return "rock";
    case "✋":
      return "paper";
    case "✌️":
      return "scissors";
  }
}

rulesBtn.addEventListener("click", () => {
  rulesPopup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === rulesPopup) {
    rulesPopup.style.display = "none";
  }
});
