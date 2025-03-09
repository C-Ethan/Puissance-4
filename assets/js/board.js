export class Board {
  constructor(rows, cols, game) {
    this.rows = rows;
    this.cols = cols;
    this.game = game;
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    console.log("Initial Grid:", grid);
    return grid;
  }

  drawBoard() {
    const boardTable = document.getElementById('board');
    boardTable.innerHTML = '';
    for (let r = 0; r < this.rows; r++) {
      const row = document.createElement('tr');
      for (let c = 0; c < this.cols; c++) {
        const cell = document.createElement('td');
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener('click', () => this.handleCellClick(c));
        row.appendChild(cell);
      }
      boardTable.appendChild(row);
    }
  }

  handleCellClick(col) {
    const playerId = this.game.getCurrentPlayer().id;
    const success = this.placeToken(col, playerId);
    if (success) {
      if (this.checkForWin(playerId)) {
        alert(`le joueur ${this.game.getCurrentPlayer().name} a gagné !`);
      } else {
          this.game.switchPlayer();
      }
    }
  }

  placeToken(col, playerId) {
    for (let r = this.rows - 1; r >= 0; r--) {
      if (this.grid[r][col] === 0) {
          this.grid[r][col] = playerId;
          this.updateBoard();
          return true;
      }
    }
    return false;
  }

  updateBoard() {
    const boardTable = document.getElementById("board");
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = boardTable.rows[r].cells[c];
        if (this.grid[r][c] === 0) {
            cell.className = "";
            cell.style.backgroundColor = "";
        } else if (this.grid[r][c] === 1) {
            cell.className = "token-player1";
            cell.style.backgroundColor = this.game.players[0].color;
        } else if (this.grid[r][c] === 2) {
            cell.className = "token-player2";
            cell.style.backgroundColor = this.game.players[1].color;
        }
      }
    }
  }

  checkForWin(playerId) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c <= this.cols - 4; c++) {
        if (this.grid[r][c] === playerId &&
            this.grid[r][c + 1] === playerId &&
            this.grid[r][c + 2] === playerId &&
            this.grid[r][c + 3] === playerId) {
            return true;
        }
      }
    }

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r <= this.rows - 4; r++) {
        if (this.grid[r][c] === playerId &&
            this.grid[r + 1][c] === playerId &&
            this.grid[r + 2][c] === playerId &&
            this.grid[r + 3][c] === playerId) {
            return true;
        }
      }
    }

    for (let r = 0; r <= this.rows - 4; r++) {
      for (let c = 0; c <= this.cols - 4; c++) {
        if (this.grid[r][c] === playerId &&
            this.grid[r + 1][c + 1] === playerId &&
            this.grid[r + 2][c + 2] === playerId &&
            this.grid[r + 3][c + 3] === playerId) {
            return true;
        }
      }
    }

    for (let r = 3; r < this.rows; r++) {
      for (let c = 0; c <= this.cols - 4; c++) {
        if (this.grid[r][c] === playerId &&
            this.grid[r - 1][c + 1] === playerId &&
            this.grid[r - 2][c + 2] === playerId &&
            this.grid[r - 3][c + 3] === playerId) {
            return true;
        }
      }
    }

    return false;
  }
}