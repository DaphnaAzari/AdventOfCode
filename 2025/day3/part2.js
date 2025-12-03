const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

// split by commas because the input file has all ranges on a single line
const lines = input.trim().split('\n');
console.log("lines", lines);

//pick exactly 12 digits- in order, without rearranging!!!!
// & form the largest possible 12 digit number & keep them in the same order
//then add all those numbers from each line together

// store the largest 12digit number from each line
let maxJoltage = [];

// loop over each input line
for (const line of lines) {
    console.log(" line:", line);

    //convert original line to arr of numbers:
    const digits = line.split('').map(Number);
    console.log("digits", digits);

    // pick exactly 12 digits
    const neededDigits = 12;
    // for the digits I will pick in order:           
    const chosenDigits = [];

    //start searching arr from 0
    let start = 0;
    // how many digits remain from start onward                
    let remainingDigits = digits.length;

    console.log("total digits:", digits.length);
    console.log("need to pick:", neededDigits);

    // pick exactly 12 digits (neededDigits is 12)to form the largest possible number 
    //& stay in order:
    for (let i = 0; i < neededDigits; i++) {

        // last index allowed to consider for the current digit
        // this ensures I have enough digits for the remaining picks
        //digits.length - 1 : last index in the arr
        //(neededDigits - i - 1) : how many digits are still needed after this pick
        //12- current i -1 
        //this way we know how many more digits we need to find. 
        //**first part is last index i looked at MINUS number of digits needed after thisone
        const end = (digits.length - 1) - (neededDigits - i - 1);
        console.log("end", end)

        console.log(`pick number:${i + 1}`);
        console.log(`search range: start:${start} & end:${end}`);

        //keeps track of the largest digit found so far in range:
        let bestDigit = 0;
        let bestIndex = start;

        // find the largest digit between start & end
        for (let j = start; j <= end; j++) {
            if (digits[j] > bestDigit) {
                bestDigit = digits[j];
                bestIndex = j;
                console.log(`new best digit=${bestDigit} at index=${bestIndex}`);
            } else {
                console.log(`checked digit=${digits[j]} at index=${j}`);
            }
        }

        chosenDigits.push(bestDigit);
        console.log(`chosenDigits so far:`, chosenDigits);

        // next digit must come after this one
        start = bestIndex + 1;
        // update how many digits remain                  
        remainingDigits = digits.length - start;
        console.log(`next start index: ${start}`);
        console.log(`remaining digits after this pick: ${remainingDigits}`);
    }
    //make into string
    const numberStr = chosenDigits.join('');
    //make into number:
    const number = Number(numberStr);
    console.log("Final 12 digit number for this line:", numberStr);
    //push into arr
    maxJoltage.push(number);
}

// sum the results similar to before
const total = maxJoltage.reduce((sum, n) => sum + n, 0);

console.log("biggest 12-digit values per line:", maxJoltage);
console.log("Total joltage:", total);
