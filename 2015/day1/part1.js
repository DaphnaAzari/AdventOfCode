const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');



const santaInstruct = lines[0];
const santasArray = santaInstruct.split("");
const plusArray = santasArray.filter(x => x === '(');
const minusArray = santasArray.filter(x => x === ')');
const answerArray = plusArray.length - minusArray.length;
console.log("answerArray", answerArray)

