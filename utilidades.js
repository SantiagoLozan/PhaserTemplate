//crear enumeradores
const Player_Movement = {
  x: 160,
  y: 300,
};

const Platform_Movement = {
  x: 250,
};

const TIMER = 40;
const TIMER_DELAY = 1000;
const SHAPE_DELAY = 3000;

const TRIANGULO = "Triangulo";
const CUADRADO = "Cuadrado";
const ROMBO = "Rombo";
const RAYO = "Rayo";

const SHAPES = [TRIANGULO, CUADRADO, ROMBO, RAYO];

export {
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
};
