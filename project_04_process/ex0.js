import process from 'node:process';
import {env} from 'node:process';

console.log('ENV?', env.PATH);
if(Boolean(+((new Date()).getSeconds())%2)) {
    process.exit(0)
} else {
    process.exit(34);
}

// test:
//node ex0.js
// echo $?