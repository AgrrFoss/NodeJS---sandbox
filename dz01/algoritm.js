export default function ([a, b, c]) {
    const d = Math.pow(b, 2) - ( 4 * a * c);
    if (d < 0) {
        return false;
    } else if (d === 0) {
        const x = -b / (2 * a)
        const result = {'x': x};
        return result;
    } else {
        const x1 = (-b + (Math.sqrt(d)) / (2 * a));
        const x2 = (-b - (Math.sqrt(d)) / (2 * a));
        const result = {x1: x1, x2: x2};
        return result;
    }
}
