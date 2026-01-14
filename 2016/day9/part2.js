const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');


//**part 2:
//function that returns the decompressed length
//of a substring, fully expanding nested markers

function getLength(line, start, end) {
    let totalLength = 0;
    let i = start;

    while (i < end) {
        const ch = line[i];

        // ignore whitespace
        if (ch === ' ' || ch === '\t') {
            i++;
            continue;
        }

        if (ch !== '(') {
            // normal character
            totalLength++;
            i++;
        } else {
            // parse marker (AxB)
            // skip '('
            i++;

            let charsStr = '';
            while (line[i] !== 'x') {
                charsStr += line[i];
                i++;
            }

            // skip 'x'
            i++;

            let repeatStr = '';
            while (line[i] !== ')') {
                repeatStr += line[i];
                i++;
            }

            i++; // skip ')'

            const chars = Number(charsStr);
            const repeat = Number(repeatStr);

            // recursively compute length of next chars characters
            const subLength = getLength(line, i, i + chars);

            totalLength += subLength * repeat;

            // skip the consumed characters
            i += chars;
        }
    }

    return totalLength;
}

// change from part1 is:
// use recursive length calculation instead of a loop counter
let finalLength = 0;

for (const line of lines) {
    finalLength += getLength(line, 0, line.length);
}

console.log('Decompressed length:', finalLength);
