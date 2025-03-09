import { Board } from "./board.js";
import { Player } from "./player.js";

export class Game {
  constructor(rows, cols, player1Color, player2Color, player1Name, player2Name) {
    this.board = new Board(rows, cols, this);
    this.players = [
      new Player(1, player1Color, player1Name),
      new Player(2, player2Color, player2Name),
    ];
    this.currentPlayerIndex = 0;
    this.gameHistory = [];
  }

  init() {
    this.board.drawBoard();
    this.updateStatus();
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  switchPlayer() {
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.updateStatus();
  }

  updateStatus() {
    const statusDiv = document.getElementById("current-player");
    if (statusDiv) {
      const player = this.getCurrentPlayer();
      statusDiv.innerText = `Tour de ${player.name}`;
    }
  }

  restartGame() {
    this.board.grid = this.board.createGrid();
    this.board.drawBoard();
    this.updateStatus();
  }

  recordGameResult(winnerName) {
    this.gameHistory.push({winner : winnerName});
    this.displayGameHistory();
  }

  displayGameHistory() {
    const historyDiv = document.getElementById("game-history");
    if (historyDiv) {
      historyDiv.innerHTML = '<h3>Historique des parties :</h3>';
      this.gameHistory.forEach((result, index) => {
        const resultElement = document.createElement('p');
        resultElement.innerText = `Partie ${index + 1}: Gagné par : ${result.winner}`;
        historyDiv.appendChild(resultElement);
      });
    }
  }
}