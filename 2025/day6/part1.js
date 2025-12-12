const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');
console.log("lines", lines)

//turn each line into an array of values
//each inner array represents one original line from input
//change data so columns from the input becomes horizontal arrays
//sperate oporator to use later
//reading over each oporator to determin what to do (times OR +)
//print the operation and its result
//add each result to a running total

//parse each line into letters(nums in this case)
let rows = [];
for (const line of lines) {
    //trim removes spaces,split breaks the line at every space,
    //.filter(x => x !== '') removes empty strings: 
    const letter = line.trim().split(' ').filter(x => x !== '');
    rows.push(letter);
}
console.log("rows:", rows)

//rotate the data so columns become arrays

let horizontalLines = [];

//check how many columns exist:
const columnCount = rows[0].length;
for (let col = 0; col < columnCount; col++) {
    let column = [];
    for (let row = 0; row < rows.length; row++) {
        column.push(rows[row][col]);
    }
    horizontalLines.push(column);
}

console.log("horizontalLines", horizontalLines);

let total = 0;

for (const hline of horizontalLines) {

    //get oporator:
    const operator = hline.at(-1);
    //get the numb strings and conver to numb:         
    const nums = hline.slice(0, -1).map(Number);

    let result = 0;

    switch (operator) {
        case "*":
            //reduce's second argument is intial accumilator value:
            // with *, it has to be 0 
            //(0*anything) would make it zero so I have to add the 1 to make 
            //make sure it will not destroy the result
            result = nums.reduce((a, b) => a * b, 1);

            break;
        case "+":
            result = nums.reduce((a, b) => a + b, 0);
            break;

    }
    //to see what oporator was used and the result:
    console.log(`Operation ${nums.join(" " + operator + " ")} =`, result);
    total += result;
}
console.log("total result:", total);