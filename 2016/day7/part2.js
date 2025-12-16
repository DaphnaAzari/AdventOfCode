const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');

console.log("lines", lines)
//Part 2
//collect all ABAs from outside brackets
//for each ABA generate a corresponding BAB
//check if any of those BABs appear inside brackets
//if yes then the IP supports SSL


let ipCounter = 0;

// find all ABA patterns in a string, like before but shorter as only 3 chars
const getABAs = (str) => {
    const abas = [];
    for (let i = 0; i < str.length - 2; i++) {
        const a = str[i];
        const b = str[i + 1];
        const c = str[i + 2];
        if (a === c && a !== b) {
            abas.push(a + b + a);
        }
    }
    return abas;
};

// split IP into outside and insidebracket sequences like before
const splitIPIntoSequences = (ip) => {
    const sequencesOutsideBrackets = [];
    const sequencesInsideBrackets = [];

    let currentSequence = '';
    let insideBrackets = false;

    for (let char of ip) {
        if (char === '[') {
            if (currentSequence) sequencesOutsideBrackets.push(currentSequence);
            currentSequence = '';
            insideBrackets = true;
        } else if (char === ']') {
            if (currentSequence) sequencesInsideBrackets.push(currentSequence);
            currentSequence = '';
            insideBrackets = false;
        } else {
            currentSequence += char;
        }
    }

    if (currentSequence) {
        if (insideBrackets) sequencesInsideBrackets.push(currentSequence);
        else sequencesOutsideBrackets.push(currentSequence);
    }

    return [sequencesOutsideBrackets, sequencesInsideBrackets];
};


for (const line of lines) {
    //take arrays that splitIPIntoSequences produces & 
    //storethem in variables outside and inside:
    const [outside, inside] = splitIPIntoSequences(line);

    // collect all ABAs outside brackets by:
    //looking at each outside sequence
    //then find all ABA patterns inside it & collect them into one list
    //abasOutside has all ABA patterns that are outside brackets!
    const abasOutside = [];
    outside.forEach(seq => {
        abasOutside.push(...getABAs(seq));
    });

    // convert ABAs to BABs by:
    const arrayOfBABs = [];
    abasOutside.forEach(aba => {
        //aba[0] is outer letters, aba[1] is middle letter
        arrayOfBABs.push(aba[1] + aba[0] + aba[1]);
    });

    // check if any BAB appears inside brackets
    let supportsSSL = false;

    //loop and look at each inside bracket sequence
    //look for any required BAB inside it
    //stop as soon as I find one
    for (const insideSeq of inside) {
        for (const bab of arrayOfBABs) {
            if (insideSeq.includes(bab)) {
                //if apears change it:
                supportsSSL = true;
                break;
            }
        }
        if (supportsSSL) break;
    }

    if (supportsSSL) {
        ipCounter++;
    }
}

console.log(ipCounter);
