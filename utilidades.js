//crear enumeradores
const Player_Movement = {
  x: 160,
  y: 300,
};

const Platform_Movement = {
  x: 250,
};

const TIMER = 60;
const TIMER_DELAY = 1000;
const SHAPE_DELAY = 1500;

const TRIANGULO = "Triangulo";
const CUADRADO = "Cuadrado";
const ROMBO = "Rombo";
const RAYO = "Rayo";
const POINTS_PERCENTAGE = "value";
const POINTS_PERCENTAGE_VALUE_START = 1;

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
  POINTS_PERCENTAGE,
  POINTS_PERCENTAGE_VALUE_START,
};
