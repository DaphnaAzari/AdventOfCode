const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');

const santaInstruct = lines[0];
const santasArray = santaInstruct.split("");
let counter = 0;
for (let i = 0; i <= santasArray.length - 1; i++) {
    santasArray[i] == '(' ? counter++ : counter--;
    if (counter === -1) {
        console.log("i:", i)
        break
    }
}
