import Square from './square.mjs';
import {SquareCircle} from "./squareCircle.mjs";

const o = new Square(4);
const s = new SquareCircle(8);
console.log(`Square = ${o.area()}`);
console.log(`Square = ${s.area()}`);

// async exemple mjs
const p1 = new Promise ((resolve, reject) => {
    setTimeout(()=> {
        console.log('timeout finished');
        if(Boolean(+((new Date()).getSeconds())%2)){
            resolve('success');
        } else {
            reject('error');
        }
    }, 2000)
});

// Work in mjs (now work in cjs)
try{
    const  successResult = await p1;
    console.log('Async call success', successResult);
} catch(e) {
    console.log('Async call failed', e);
}