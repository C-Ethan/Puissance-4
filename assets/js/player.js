export class Player {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }

  updateColor(newColor) {
    this.color = newColor;
    this.applyColorToTokens();
  }

  applyColorToTokens() {
    const tokenClass = `.token-player${this.id}`;
    document.querySelectorAll(tokenClass).forEach((cell) => {
      cell.style.backgroundColor = this.color;
    });
  }
}