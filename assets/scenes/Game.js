import {
  Player_Movement,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
  TIMER,
  TIMER_DELAY,
} from "../../utilidades.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.objetos = {
      ["Triangulo"]: { count: 0, score: 100 },
      ["Cuadrado"]: { count: 0, score: 4 },
      ["Rombo"]: { count: 0, score: 5 },
    };
    this.isWinner = false;
    this.isGameOver = false;
    this.puntos = 0;
    this.timer = TIMER;
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

    //evento contador
    this.time.addEvent({
      delay: TIMER_DELAY,
      callback: this.contador,
      callbackScope: this,
      loop: true,
    });

    //agregar texto puntaje
    this.scoreText = this.add.text(16, 16, "T: 0 / C: 0 / R: 0", {
      fontSize: "20px",
      fill: "#1af",
    });

    //agregar texto CONTADOR
    this.textoTemporizador = this.add.text(550, 0, "Tiempo: " + this.timer, {
      fontSize: "40px",
      fill: "#FFFFFF",
    });
  }

  update() {
    //revisar si el jugador ganó o perdió
    if (this.isWinner) {
      this.scene.start("winner");
    }
    if (this.isGameOver) {
      this.scene.start("gameOver");
    }

    if (this.timer === 0) {
      this.isGameOver = true;
    }

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

    this.puntosT =
      this.objetos[TRIANGULO].count * this.objetos[TRIANGULO].score;
    this.puntosC = this.objetos[CUADRADO].count * this.objetos[CUADRADO].score;
    this.puntosR = this.objetos[ROMBO].count * this.objetos[ROMBO].score;

    this.puntos = this.puntosT + this.puntosC + this.puntosR;

    //Actualizar el texto de puntaje
    this.scoreText.setText(
      "T: " +
        this.objetos[TRIANGULO].count +
        " / C: " +
        this.objetos[CUADRADO].count +
        " / R: " +
        this.objetos[ROMBO].count
    );
    if (
      this.objetos[TRIANGULO].count >= 2 &&
      this.objetos[CUADRADO].count >= 2 &&
      this.objetos[ROMBO].count >= 2 &&
      this.puntos >= 100
    ) {
      this.isWinner = true;
    }
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
  contador() {
    console.log(this.timer);
    this.timer--;
    console.log(this.timer);
    this.textoTemporizador.setText("Tiempo: " + this.timer);
  }
}
