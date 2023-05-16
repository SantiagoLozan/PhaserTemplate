export default class Information extends Phaser.Scene {
    constructor() {
      super("information");
    }
  
    init() {}
  
    preload() {
        this.load.image("cua", "assets/images/Cuadrado.png");
        this.load.image("cir", "assets/images/Circulo.png");
        this.load.image("ray", "assets/images/Rayo.png");
        this.load.image("rom", "assets/images/Rombo.png");
        this.load.image("tri", "assets/images/Triangulo.png")
        this.load.image("enter", "assets/images/teclaEnter.png");
        this.enter = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
  
    create() {
        this.add.image(700,75,"cua");
        this.add.image(700,150,"rom");
        this.add.image(700,225,"cir");
        this.add.image(700,300,"tri");
        this.add.image(705,380,"ray").setScale(1.3);
        this.add.image(395, 525, "enter").setScale(0.5);
        this.textoInformacion = this.add.text(
            5,
            40,
            "Moncho debe recolectar la mayor cantidad de formas posibles.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            60,
            "Cada forma tiene un puntaje diferente.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            80,
            "El cuadrado 5 puntos, rombo 10, circulo 15 y triangulo 20.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            100,
            "Para ganar el nivel, se necesita:",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            120,
            "Recolectar 2 formas de cada una y tener minimo 100 puntos.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            180,
            "El Rayo es un objeto que resta 50 puntos al recolectarlo.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            180,
            "El Rayo es un objeto que resta 50 puntos al recolectarlo.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
          this.textoInformacion = this.add.text(
            5,
            240,
            "Si Moncho se queda sin tiempo o junta 3 rayos, PIERDE.",
            {
              fontSize: "18px",
              fill: "#FFFFFF",
            }
          );
        }
    
    update() {
        if (this.enter.isDown) {
            this.scene.start("game");
          }
    }
}
