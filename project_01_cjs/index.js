const Square = require('./square.js');
const o = new Square(5);
console.log(`square = ${o.area()}`);


//assync  examples (cjs)

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
// classic work with promise
p1.then(state=> {
    console.log('then detected', state);
}).catch(err=>{
    console.log('catch detected', err);
}).finally(()=> {
    console.log('finally detected');
});

// Don't work in cjs
/*
try{
    const  successResult = await p1;
    console.log('Async call success', successResult);
} catch(e) {
    console.log('Async call failed', e);
}
*/






// async await in cjs
// async function runner();
async function runner() {
    try{
        const  successResult = await p1;
        console.log('Async call success', successResult);
    } catch(e) {
        console.log('Async call failed', e);
    }
}
runner();

// working async await unname function
(async function() {
    try{
        const  successResult = await p1;
        console.log('Async call success', successResult);
    } catch(e) {
        console.log('Async call failed', e);
    }
})();

// working async await arrow function
(async ()=> {
    try{
        const  successResult = await p1;
        console.log('Async call success', successResult);
    } catch(e) {
        console.log('Async call failed', e);
    }
})();

