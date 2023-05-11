export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {}

  preload() {
    this.load.audio("derrota", "assets/audio/SFX_Lose.wav");
  }

  create() {
    this.textoGanador = this.add.text(400, 400, "Has Perdido", {
      fontSize: "40px",
      fill: "#FFFFFF",
    });
    const sonidoPerder = this.sound.add("derrota", { loop: false });
    sonidoPerder.play();
  }

  update() {}
}
