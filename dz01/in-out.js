import process from 'node:process';
import {argv, stderr, stdout} from 'node:process';
import algorithm from "./algoritm.js";

const numbers = argv.slice(2, 5).map(arg => Number(arg));
if(numbers.length < 3) {
    stdout.write('Для вычисления уравнения укажите 3 числа при запуске скрипта через пробел.\n');
    process.exit(1);
} else {
    stdout.write('Ты молодец, указал 3 числа.\n');
    const result = algorithm(numbers)
    if (result){
        stdout.write(`Результат решения: ${result}\n`);
        process.exit(0);
    } else {
        stdout.write('Дискриминант не имеет корней, уравнение не верно.\n');
        process.exit(4);
    }
}