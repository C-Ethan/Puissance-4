import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', () => {
        const player1Color = document.getElementById('player1-color').value;
        const player2Color = document.getElementById('player2-color').value;

        if (player1Color && player2Color) {
            const game = new Game(6, 7, player1Color, player2Color);
            game.init();

            document.getElementById('color-picker').style.display = 'none';
            startButton.style.display = 'none';

            document.getElementById('board').style.display = 'table';
        } else {
            alert('Veuillez choisir les couleurs pour les deux joueurs.');
        }
    });
});