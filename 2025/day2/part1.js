const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

// split by commas because the input file has all ranges on a single line
const lines = input.trim().split(",");

//loop over input and seperate to two IDs and a dash
//convert seperated IDs into numbers
//firstId start point of range-secondID end point that I need to check
//add conditionals to the range to exclude invalid IDs
//add invalid IDs to a counter

console.log("lines", lines)
//variable to count invalid IDs (actually sum of IDs in this puzzle):

let invalidIdCount = 0;

for (const line of lines) {

    let dashIndex = line.indexOf("-");
    console.log("dashIndex:", dashIndex);
    // trim to remove spaces
    let firstId = parseInt(line.slice(0, dashIndex));
    console.log("firstId:", firstId);

    let secondId = parseInt(line.slice(dashIndex + 1));
    console.log("secondId:", secondId);

    for (let i = firstId; i <= secondId; i++) {
        //converts num to string as easier to check using string
        const numStr = String(i);

        //check if the number is a repeated sequence
        //initially I assume the ID is valid:
        let isInvalid = false;

        // try all possible sequence lengths: 
        //(from 1 up to half the number)
        //only need to check up to half because a repeated sequence 
        //must fit exactly twice in the number
        //try every possible sequence 
        //that could repeat twice to form the number up to middle
        //Math.floor prevents trying impossible sequences
        for (let seqLength = 1; seqLength <= Math.floor(numStr.length / 2); seqLength++) {
            //slice out a sequence (take first few digits of number)
            const seq = numStr.slice(0, seqLength);

            //check if repeating this sequence twice gives the number
            if (seq + seq === numStr) {
                //marks it as invalid:
                isInvalid = true;
                break;
            }
        }

        //if number is invalid, add it to total sum
        if (isInvalid) {
            // sum the invalid IDs
            invalidIdCount += i;
        }
    }
}

console.log("invalidIdCount:", invalidIdCount);

//take each number in the current range

//convert  to a string

//try every possible sequence length and check if:
// repeating it twice equals the number

//if a match is found then mark the number invalid

//iff invalid then add it to the sum

//print the sum