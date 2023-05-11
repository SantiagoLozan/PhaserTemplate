export default class Winner extends Phaser.Scene {
  constructor() {
    super("winner");
  }

  init() {}

  preload() {
    this.load.audio("victoria", "assets/audio/SFX_Win.wav");
  }

  create() {
    this.textoGanador = this.add.text(400, 400, "Has Ganado", {
      fontSize: "40px",
      fill: "#FFFFFF",
    });
    const sonidoGanar = this.sound.add("victoria", { loop: false });
    sonidoGanar.play();
  }
  update() {}
}
