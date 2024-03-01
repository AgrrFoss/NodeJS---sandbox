import process from 'node:process';
import {env, stdin} from 'node:process';
let data = ''
stdin.on('readable', ()=>{

    const chunk = stdin.read();
    if(chunk !== null) {
        console.log('chunk detected:', chunk.toString())
        data += chunk;
    }
});

stdin.on('end', ()=>{
    console.log('end detected. Received data:', data);
    process.exit(0);
})

// node ex1_stdin.js <<< 'some text'
// ls -l | node ex1_stdin.js