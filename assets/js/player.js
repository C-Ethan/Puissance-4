export class Player {
  constructor(id, color, name) {
    this.id = id;
    this.color = color;
    this.name = name;
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