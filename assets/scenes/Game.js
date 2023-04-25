import {
  Player_Movement,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
} from "../../utilidades.js";
export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.objetos = {
      ["Triangulo"]: { count: 0, score: 10 },
      ["Cuadrado"]: { count: 0, score: 15 },
      ["Rombo"]: { count: 0, score: 5 },
    };
  }

  preload() {
    this.load.image(ROMBO, "assets/images/Rombo.png");
    this.load.image(TRIANGULO, "assets/images/Triangulo.png");
    this.load.image(CUADRADO, "assets/images/Cuadrado.png");
    this.load.image("Cielo", "assets/images/Cielo.png");
    this.load.image("Ninja", "assets/images/Ninja.png");
    this.load.image("Plataforma", "assets/images/platform.png");
  }

  create() {
    this.add.image(400, 300, "Cielo").setScale(0.555);

    //Con Fisicas
    this.player = this.physics.add.sprite(200, 300, "Ninja");

    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 568, "Plataforma").setScale(2).refreshBody();
    this.plataformas.create(600, 400, "Plataforma");

    this.shapeGroup = this.physics.add.group();

    this.physics.add.collider(this.player, this.plataformas);
    this.physics.add.collider(this.plataformas, this.shapeGroup);
    this.physics.add.overlap(
      this.player,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );
    //this.collectshape es la funcion que llama cuando los dos parametros se superponen

    //Crear Botones
    this.cursors = this.input.keyboard.createCursorKeys();

    //crear eventos para agregar formas
    this.time.addEvent({
      delay: SHAPE_DELAY,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-Player_Movement.x);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(Player_Movement.x);
    } else {
      this.player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-Player_Movement.y);
    }
  }

  collectShape(player, shape) {
    // la remueve de pantalla
    console.log("figura recolectada");
    shape.disableBody(true, true);
    const shapeName = shape.texture.key;

    this.objetos[shapeName].count++;
    console.log(this.objetos);
  }
  addShape() {
    console.log("Se crea una forma");
    //Elige una forma dentro del array shapes
    const randomShape = Phaser.Math.RND.pick(SHAPES);
    //elige un lugar random entre 0 y 800 pixels
    const randomX = Phaser.Math.RND.between(0, 800);

    console.log(randomX, randomShape);
    //crea el asset en x con forma random
    this.shapeGroup.create(randomX, 0, randomShape);
  }
}
