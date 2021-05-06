//iconos estrellas
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
const cero = (
  <>
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const one = (
  <>
    <StarHalfIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const two = (
  <>
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const three = (
  <>
    <StarIcon />
    <StarHalfIcon />

    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const four = (
  <>
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const five = (
  <>
    <StarIcon />
    <StarIcon />
    <StarHalfIcon />

    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const six = (
  <>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
    <StarBorderIcon />
  </>
);
const seven = (
  <>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarHalfIcon />

    <StarBorderIcon />
  </>
);
const eight = (
  <>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarBorderIcon />
  </>
);
const nine = (
  <>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarHalfIcon />
  </>
);
const ten = (
  <>
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
  </>
);
const starsArray = [
  cero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
];
/**
 * Función que devuelve la puntuación del 1 al 10 en forma de estrellas
 * @param {Number} props - Introduce la puntuación
 */
export default function Stars({ number = 5 }) {
  if (!number) {
    number = 5;
  }
  if (number < 0 || number > 10) {
    throw new Error("La valoración debe estar dentro de un margen de 0 y 10");
  }
  return starsArray[number];
}
