//calculate smallest perimeter
// Each present requires a bow equal to the cubic feet of volume of the present (l*w*h)

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');



//test input 2x3x4
// loop over the lines arr
//first thing is calculating the perimiters
//check what is the smallest one of the three
//console.log to see it
//to get the bow l*w*h
//get total amount of bow+ smallest per

let result = 0;
console.log("lines:", lines)
for (let i = 0; i < lines.length; i++) {
    // console.log("lines[i]", lines[i])
    const [length, width, height] = lines[i].split('x').map(item => parseInt(item)).sort((a, b) => a - b);
    console.log("length, width, height:", length, width, height)
    const perimeter = (2 * length) + (2 * width);
    // console.log("perimeter:", perimeter)

    const bow = (length * width * height);
    // console.log("bow", bow)
    // console.log("answer:", (bow + perimeter))
    result += (bow + perimeter)
    // console.log("result", result)

}

console.log("result", result)

// const total = result.reduce((total, i) => {
//     return total + i
// }, 0)

// console.log("total", total)

