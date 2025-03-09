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
    this.moveHistory = [];
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
    this.moveHistory = [];
  }

  recordGameResult(winnerName) {
    this.gameHistory.push({ winner: winnerName });
    this.displayGameHistory();

    const resetButton = document.getElementById('reset-history-button');
    if (resetButton) {
      resetButton.style.display = 'inline-block';
    }
  }

  resetGameHistory() {
    this.gameHistory = [];
    this.displayGameHistory();

    const resetButton = document.getElementById('reset-history-button');
    if (resetButton) {
      resetButton.style.display = 'none';
    }
  }

  displayGameHistory() {
    const historyEntriesDiv = document.getElementById("history-entries");
    if (historyEntriesDiv) {
      historyEntriesDiv.innerHTML = "";
      this.gameHistory.forEach((result, index) => {
        const resultElement = document.createElement("p");
        resultElement.innerText = `Partie ${index + 1} : Gagné par ${result.winner}`;
        historyEntriesDiv.appendChild(resultElement);
      });
    }
  }

  undoLastMove() {
    if (this.moveHistory.length > 0) {
        const lastMove = this.moveHistory.pop();
        this.board.grid[lastMove.row][lastMove.col] = 0;
        this.board.updateBoard();
        this.switchPlayer();
    }
  }

  placeToken(col, playerId) {
    const success = this.board.placeToken(col, playerId);
    if (success) {
      const lastMoveRow = this.board.getLastMoveRow(col);
      if (lastMoveRow !== -1) {
        this.moveHistory.push({ row: lastMoveRow, col: col });
      }
    }
    return success;
  }
}