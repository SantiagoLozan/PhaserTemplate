export default class Winner extends Phaser.Scene {
  constructor() {
    super("winner");
  }

  init() {}

  preload() {
    this.load.audio("victoria", "assets/audio/SFX_Win.wav");
    this.load.image("restart", "assets/images/keyR.png");
    this.letraR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  create() {
    this.textoGanador = this.add.text(
      100,
      150,
      "Has Ganado. Presiona 'R' para reiniciar",
      {
        fontSize: "25px",
        fill: "#FFFFFF",
      }
    );
    this.add.image(395, 405, "restart").setScale(0.5);
    const sonidoGanar = this.sound.add("victoria", { loop: false });
    sonidoGanar.play();
  }
  update() {
    if (this.letraR.isDown) {
      this.scene.start("preload");
    }
  }
}
