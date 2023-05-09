export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  init() {}

  preload() {
    this.load.image("menu", "assets/images/ninjaMenu.jpg");
    this.load.image("enter", "assets/images/teclaEnter.png");
    this.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  create() {
    this.add.image(400, 230, "menu").setScale(1.5);
    this.add.image(395, 525, "enter").setScale(0.5);
  }

  update() {
    if (this.enter.isDown) {
      this.scene.start("game");
    }
  }
}
