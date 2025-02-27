import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(6, 7, '#e63946', '#f1c40f');
    game.init();

    document.getElementById('player1-color').addEventListener('input', function() {
        game.players[0].updateColor(this.value);
    });

    document.getElementById('player2-color').addEventListener('input', function() {
        game.players[1].updateColor(this.value);
    });
});
