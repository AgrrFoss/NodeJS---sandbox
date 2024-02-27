import Square from './square.mjs';
import {SquareCircle} from "./squareCircle.mjs";

const o = new Square(4);
const s = new SquareCircle(8);
console.log(`Square = ${o.area()}`);
console.log(`Square = ${s.area()}`);