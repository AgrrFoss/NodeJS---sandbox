import process from 'node:process';
import {argv, stderr, stdout} from 'node:process';

const args = argv.slice(2);


if (args[0] && args[1]) {
    console.log('args: ', args);
    stdout.write('params ok\n');
} else {
    stderr.write('args not found\n');
    process.exit(1);
}