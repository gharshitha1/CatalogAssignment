const fs = require('fs');
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}
function lagrangeInterpolation(points) {
    let c = 0;
    const k = points.length;
    for (let i = 0; i < k; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += term;
    }
    return Math.round(c);
}
function main() {
    const data = JSON.parse(fs.readFileSync('input2.json', 'utf8'));
    const n = data.keys.n;
    const k = data.keys.k;
    let points = [];
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const base = data[i].base;
            const value = data[i].value;
            const x = parseInt(i);
            const y = decodeValue(base, value);
            points.push([x, y]);
        } 
    }
    const secretC = lagrangeInterpolation(points.slice(0, k));
    console.log(`The secret constant term c is: ${secretC}`);
}
main();

