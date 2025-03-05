import { Board } from './board.js';
import { Player } from './player.js';

export class Game {
    constructor(rows, cols, player1Color, player2Color) {
        this.board = new Board(rows, cols, this);
        this.players = [
            new Player(1, player1Color),
            new Player(2, player2Color),
        ];
        this.currentPlayerIndex = 0;
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
        const statusDiv = document.getElementById('current-player');
        if (statusDiv) {
            const player = this.getCurrentPlayer();
            statusDiv.innerText = `Tour du joueur ${player.id}`;
        }
    }

    checkForWin() {
    }
}