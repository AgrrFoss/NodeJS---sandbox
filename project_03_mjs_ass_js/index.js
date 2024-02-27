import Square from './square.js';
import {SquareCircle} from "./squareCircle.js";

const o = new Square(4);
const s = new SquareCircle(8);
console.log(`Square = ${o.area()}`);
console.log(`Square = ${s.area()}`);