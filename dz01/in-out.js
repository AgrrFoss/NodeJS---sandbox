import process from 'node:process';
import {argv, stderr, stdout} from 'node:process';
import algorithm from "./algoritm.js";

const numbers = argv.slice(2, 5).map(arg => Number(arg));
if(numbers.length < 3) {
    stdout.write('Для вычисления уравнения укажите 3 числа при запуске скрипта через пробел.\n');
    process.exit(1);
} else {
    const result = algorithm(numbers)
    if (result.x){
        stdout.write(`Результат решения: x = ${result.x}\n`);
        process.exit(0);
    } else if(result.x1 & result.x2){
        stdout.write(`Результат решения: x1 = ${result.x1}, x2 = ${result.x2}\n`);
        process.exit(0);
    }
    else {
<<<<<<< HEAD
        stderr.write('Дискриминант не имеет корней, уравнение не верно.\n');
=======
        stdout.write('Дискриминант не имеет корней, уравнение не верно.\n');
>>>>>>> origin/main
        process.exit(4);
    }
}