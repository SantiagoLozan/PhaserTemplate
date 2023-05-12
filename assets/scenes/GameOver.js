export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {}

  preload() {
    this.load.audio("derrota", "assets/audio/SFX_Lose.wav");
    this.load.image("restart", "assets/images/keyR.png");
    this.letraR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  create() {
    this.textoGanador = this.add.text(
      100,
      150,
      "Has Perdido. Presiona 'R' para reiniciar",
      {
        fontSize: "25px",
        fill: "#FFFFFF",
      }
    );
    this.add.image(395, 405, "restart").setScale(0.5);
    const sonidoPerder = this.sound.add("derrota", { loop: false });
    sonidoPerder.play();
  }

  update() {
    if (this.letraR.isDown) {
      this.scene.start("preload");
    }
  }
}
