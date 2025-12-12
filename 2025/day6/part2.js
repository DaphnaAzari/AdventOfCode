const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\n');
// console.log("lines", lines)
let calcResults = [];

const sumCalc = (numbersToSum, operator) => {
    console.log("sumcal called", operator)
    if (operator === "*") {
        calcResults.push(numbersToSum.reduce((a, b) => a * b, 1))
        console.log("numstosum:", numbersToSum)
        console.log("calcResults:", calcResults)
    } else {
        calcResults.push(numbersToSum.reduce((a, b) => a + b, 0));
        console.log("numstosum:", numbersToSum)
        console.log("calcResults:", calcResults)
    }

    numbersToSum.length = 0;
}


let rows = [];
for (const line of lines) {

    rows.push(line);
}
console.log("rows:", rows)

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


let numbersToSum = [];
let operatorToUse = "";

for (const hline of horizontalLines) {

    //get oporator:
    const operator = hline.at(-1);
    //get the numb strings and conver to numb:         
    const nums = hline.slice(0, -1)

    if (operator !== " ") {
        operatorToUse = operator;

    }
    //correct oporator:
    console.log(" correct operator:", operator)
    console.log("nums:", nums)

    let numString = "";
    for (const num of nums) {
        numString += num
    }
    console.log("numString", numString)

    //if num ==="" then we have reached the end of what we want to 
    //calculate so we need to do the oporation now and it symbolizes 
    //the next string

    if (numString.trim() === "") {
        // I need to use the numbers stored so far and my oporator,
        //and do the calculation

        sumCalc(numbersToSum, operatorToUse)

    } else {
        numbersToSum.push(Number(numString))
    }


}
//console.log("numbersToSum:", numbersToSum)
console.log("calcresults:", calcResults)


//I pushed the sums into an array but actually I didnt add them up yet:
let grandTotal = calcResults.reduce((a, b) => a + b, 0);
console.log("grandTotal:", grandTotal)
