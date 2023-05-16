import {
  Player_Movement,
  SHAPE_DELAY,
  SHAPES,
  TRIANGULO,
  CUADRADO,
  ROMBO,
  TIMER,
  TIMER_DELAY,
  Platform_Movement,
  RAYO,
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START,
} from "../../utilidades.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.objetos = {
      ["Triangulo"]: { count: 0, score: 20 },
      ["Cuadrado"]: { count: 0, score: 15 },
      ["Rombo"]: { count: 0, score: 10 },
      ["Rayo"]: { count: 0, score: 50 },
    };
    this.isWinner = false;
    this.isGameOver = false;
    this.puntos = 0;
    this.timer = TIMER;
    this.plataformaMovible;
    //chequear disminucion score por rebote
    this.rebote;
    this.sonidoBackground;
  }

  preload() {
    this.load.image(ROMBO, "assets/images/Rombo.png");
    this.load.image(TRIANGULO, "assets/images/Triangulo.png");
    this.load.image(CUADRADO, "assets/images/Cuadrado.png");
    this.load.image("Cielo", "assets/images/Cielo.png");
    this.load.image("Ninja", "assets/images/Ninja.png");
    this.load.image("Plataforma", "assets/images/platform.png");
    this.load.image(RAYO, "assets/images/Rayo.png");
    this.load.audio("BGM", "assets/audio/BGM_Stage.mp3");
  }

  create() {
    this.add.image(400, 300, "Cielo").setScale(0.555);
    this.sonidoBackground = this.sound.add("BGM", { loop: false });
    this.sonidoBackground.play();
    //Con Fisicas
    this.player = this.physics.add.sprite(200, 300, "Ninja");
    this.player.setCollideWorldBounds(true);

    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 568, "Plataforma").setScale(2).refreshBody();

    this.plataformaMovible = this.physics.add.staticGroup();
    this.plataformaMovible = this.physics.add
      .image(400, 400, "Plataforma")
      .setScale(0.55);
    this.plataformaMovible.setImmovable(true);
    this.plataformaMovible.body.allowGravity = false;
    this.plataformaMovible.setVelocityX(250);
    this.plataformaMovible.setCollideWorldBounds(false);

    this.shapeGroup = this.physics.add.group();

    this.physics.add.collider(this.player, this.plataformas);
    this.physics.add.collider(this.plataformaMovible, this.shapeGroup);
    this.physics.add.collider(this.player, this.plataformaMovible);

    this.physics.add.overlap(
      this.player,
      this.shapeGroup,
      this.collectShape,
      null,
      this
    );
    //this.collectshape es la funcion que llama cuando los dos parametros se superponen

    // chequear reduccion score por rebote
    this.rebote = this.physics.add.collider(
      this.shapeGroup,
      this.plataformas,
      this.scoreDisminuido,
      null,
      this
    );

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

    if (this.timer === 0 || this.objetos[RAYO].count === 3) {
      this.isGameOver = true;
      this.sonidoBackground.stop();
    }
    if (this.plataformaMovible.x >= 700) {
      this.plataformaMovible.setVelocityX(-Platform_Movement.x);
    }
    if (this.plataformaMovible.x <= 100) {
      this.plataformaMovible.setVelocityX(Platform_Movement.x);
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
    const percentage = shape.getData(POINTS_PERCENTAGE);
    const scoreNow = this.objetos[shapeName].score * percentage;
    this.score += scoreNow;
    this.objetos[shapeName].count++;
    console.log(this.objetos);

    this.puntosT =
      this.objetos[TRIANGULO].count * this.objetos[TRIANGULO].score;
    this.puntosC = this.objetos[CUADRADO].count * this.objetos[CUADRADO].score;
    this.puntosR = this.objetos[ROMBO].count * this.objetos[ROMBO].score;
    this.puntosRa = this.objetos[RAYO].count * this.objetos[RAYO].score;
    this.puntos = this.puntosT + this.puntosC + this.puntosR - this.puntosRa;
    console.log("Estos son tus puntos" + this.puntos);

    //Actualizar el texto de puntaje
    this.scoreText.setText(
      "T: " +
        this.objetos[TRIANGULO].count +
        " / C: " +
        this.objetos[CUADRADO].count +
        " / R: " +
        this.objetos[ROMBO].count
    );

    //condicion victoria
    if (
      this.objetos[TRIANGULO].count >= 2 &&
      this.objetos[CUADRADO].count >= 2 &&
      this.objetos[ROMBO].count >= 2 &&
      this.puntos >= 100
    ) {
      this.isWinner = true;
      this.sonidoBackground.stop();
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
    this.shapeGroup
      .create(randomX, 0, randomShape, 0, true)
      .setCollideWorldBounds(true)
      .setBounce(1)
      .setData(POINTS_PERCENTAGE, POINTS_PERCENTAGE_VALUE_START);
  }

  contador() {
    console.log(this.timer);
    this.timer--;
    console.log(this.timer);
    this.textoTemporizador.setText("Tiempo: " + this.timer);
  }

  // chequear reduccion score por rebote
  scoreDisminuido(shape, platform) {
    const newPercentage = shape.getData(POINTS_PERCENTAGE) - 0.25;
    console.log(shape.texture.key, newPercentage);
    shape.setData(POINTS_PERCENTAGE, newPercentage);
    if (newPercentage <= 0) {
      shape.disableBody(true, true);
      return;
    }
  }
}
