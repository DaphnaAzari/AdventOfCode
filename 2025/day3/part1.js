const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

// split by commas because the input file has all ranges on a single line
const lines = input.trim().split('\n');
console.log("lines", lines)

//pick exactly two digits- in order, withour rearrange!!!!
// & form the largest possible 2 digit number
//then add all those numbers from each line together


// store the largest 2digit number from each line
let maxJoltage = [];

// loop over each input line
for (const line of lines) {
    // see digits sorted descending, just to see highest
    // let sortedLine = line.split('').sort((a, b) => b - a).join('');
    // console.log("Sorted line:", sortedLine);

    //convert original line to arr of numbers:
    const digits = line.split('').map(Number);
    console.log("digits", digits)

    // pick the first digit
    let firstDigit = 0;
    let firstIndex = 0;

    //first digit must leave room for a second digit
    //(cant allow first digit to be at the last index, as then no space for second one)
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > firstDigit) {
            firstDigit = digits[i];
            firstIndex = i;
        }
    }

    //pick the second digit from remaining digits
    //(looping over all digits after the first digit: firstIndex + 1 )
    let secondDigit = 0;
    for (let i = firstIndex + 1; i < digits.length; i++) {
        if (digits[i] > secondDigit) {
            secondDigit = digits[i];
        }
    }

    // combine into two digit number
    // times ten because:
    // the first number goes from being 9 lets say to 90 + second number
    const number = firstDigit * 10 + secondDigit;
    maxJoltage.push(number);
}

//sum all the numbers
const total = maxJoltage.reduce((sum, n) => sum + n, 0);

console.log("Largest numbers from each line:", maxJoltage);
console.log("Total output joltage:", total);