const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');

console.log("lines", lines)

//for each line-split it into sequences inside and outside brackets
//check each sequence for an ABBA using function
//count the line if it meets requirements (at least one ABBA outside brackets
//&there are no ABBAs inside brackets)

let ipCounter = 0;


const hasABBA = (str) => {
    // checking -3 because we want to check 4 chars (ABBA) at a time
    for (let i = 0; i < str.length - 3; i++) {
        const a = str[i];
        const b = str[i + 1];
        const c = str[i + 2];
        const d = str[i + 3];

        if (a === d && b === c && a !== b) {
            return true;
        }
    }
    return false;
};


//split into sequences outside brackets and inside brackets:

const splitIPIntoSequences = (ip) => {
    const sequencesOutsideBrackets = [];
    const sequencesInsideBrackets = [];

    //temporary place to store characters until I hit a bracket
    let currentSequence = '';
    let insideBrackets = false;

    for (let char of ip) {
        if (char === '[') {
            //if currentSequence is not empty-
            //push what we had before hitting [ to sequencesOutsideBrackets:
            if (currentSequence) sequencesOutsideBrackets.push(currentSequence);
            //then reset currentSequence:
            currentSequence = '';
            //from now until I hit ]- I'm inside brackets:
            insideBrackets = true;
        } else if (char === ']') {
            if (currentSequence) sequencesInsideBrackets.push(currentSequence);
            currentSequence = '';
            //set the flag to false because I'm outside brackets 
            insideBrackets = false;
        } else {
            currentSequence += char;
        }
    }
    //to deal with the part leftover, also checking if inside or out
    if (currentSequence) {
        if (insideBrackets) sequencesInsideBrackets.push(currentSequence);
        else sequencesOutsideBrackets.push(currentSequence);
    }

    return [sequencesOutsideBrackets, sequencesInsideBrackets];
};

// check each line 
for (const line of lines) {
    //calls fun splitIPIntoSequences to split line intwo two parts, using
    //array destructuring
    const [sequencesOutsideBrackets, sequencesInsideBrackets] = splitIPIntoSequences(line);

    const hasABBAOutside = sequencesOutsideBrackets.some(hasABBA);
    const hasABBAInside = sequencesInsideBrackets.some(hasABBA);

    //check if theres at least one ABBA outside brackets & none inside brackets
    if (hasABBAOutside && !hasABBAInside) {
        //iff true add to counter
        ipCounter++;
    }
}
console.log(ipCounter)

///////////////////////////////////////////////////////

// let ipCounter = 0;

// const hasABBA = (str) => {
//     //checking -3 because I want to check 4 chars (ABBA) at a time
//     for (let i = 0; i < str.length - 3; i++) {
//         const a = str[i];
//         const b = str[i + 1];
//         const c = str[i + 2];
//         const d = str[i + 3];

//         if (a === d && b === c && a !== b) {
//             return true;
//         }
//     }
//     return false;
// };

// const checkIps = (seqOne, seqTwo, seqThree) => {
//     const hasOutsideABBA =
//         hasABBA(seqOne) || hasABBA(seqThree);

//     const hasInsideABBA =
//         hasABBA(seqTwo);

//     if (hasOutsideABBA && !hasInsideABBA) {
//         ipCounter++;
//     }
// };

// for (const line of lines) {
//     let startBracket = line.indexOf("[");
//     let endBracket = line.indexOf("]");

//     let seqOne = line.slice(0, startBracket);
//     let seqTwo = line.slice(startBracket + 1, endBracket);
//     let seqThree = line.slice(endBracket + 1);

//     checkIps(seqOne, seqTwo, seqThree);
// }

// console.log(ipCounter);