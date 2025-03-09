import { Game } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");

  startButton.addEventListener("click", () => {
    const rows = parseInt(document.getElementById("rows").value, 10);
    const cols = parseInt(document.getElementById("cols").value, 10);
    const player1Color = document.getElementById("player1-color").value;
    const player2Color = document.getElementById("player2-color").value;
    const player1Name = document.getElementById("player1-name").value || "Joueur 1";
    const player2Name = document.getElementById("player2-name").value || "Joueur 2";

    if (player1Color && player2Color && !isNaN(rows) && !isNaN(cols)) {
      const game = new Game( rows, cols, player1Color, player2Color, player1Name, player2Name);
      game.init();

      document.getElementById("grid-size-picker").style.display = "none";
      document.getElementById("color-picker").style.display = "none";
      document.getElementById("player-names").style.display = "none";
      startButton.style.display = "none";

      document.getElementById("board").style.display = "table";
    }
  });
});