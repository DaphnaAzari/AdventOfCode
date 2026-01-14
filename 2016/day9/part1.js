const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');
console.log("lines", lines)

// let count = 0;

//if there is no mark, add letters to a counter array
// I need this function to take whitespeace away
//Ineed it to find the mark and find the chacters it needs to count and the repeat amount num
//I need to add any letters before the mark to an array then add the letters that 
//come up from the mark to that array 
//count all of them

let totalLength = 0;

for (const line of lines) {
    let i = 0;

    while (i < line.length) {
        const ch = line[i];

        // ignore whitespace characters:
        if (ch === ' ' || ch === '\t') {
            i++;
            continue;
        }

        if (ch !== '(') {
            // normal character:
            totalLength++;
            i++;
        } else {
            // parse marker (AxB)
            // skip '(' :
            //I'm not counting the marker:
            //how many characters to repeat A:
            i++;

            let charsStr = '';
            while (line[i] !== 'x') {
                charsStr += line[i];
                i++;
            }

            // skip 'x'
            i++;

            //how many characters to repeat B:
            let repeatStr = '';
            while (line[i] !== ')') {
                repeatStr += line[i];
                i++;
            }

            // skip ')'
            i++;

            const chars = Number(charsStr);
            const repeat = Number(repeatStr);

            // marker contributes chars * repeat to getlength
            totalLength += chars * repeat;

            // skip the next chars characters
            i += chars;
        }
    }
}

console.log('Decompressed length:', totalLength);



// let counterArray = [];

// function useMarkFunc(segment, markRepeatBy) {
//     const expanded = segment.repeat(markRepeatBy);
//     counterArray.push(expanded);
//     return expanded;
// }

// for (const line of lines) {
//     line.split(" ")
//     console.log("newline:", line)

//     if (!line.includes("(") && !line.includes(")")) {
//         counterArray.push(line)
//     } else {
//         let startMark = line.indexOf("(");
//         console.log("startMark:", startMark)
//         let endMark = line.indexOf(")") + 1;
//         console.log("endMark:", endMark)
//         let mark = line.slice(startMark, endMark);
//         console.log("mark:", mark)
//         let markCharsCount = Number(mark.slice(1, mark.indexOf("x")))
//         console.log("markCharsCount:", markCharsCount)
//         let markRepeatBy = Number(mark.slice(mark.indexOf("x") + 1, mark.length - 1))
//         console.log("markRepeatBy:", markRepeatBy)
//         let firstPartOfStr = line.slice(0, startMark);
//         console.log("firstPartOfStr:", firstPartOfStr)
//         if (firstPartOfStr.length > 0) {
//             counterArray.push(firstPartOfStr);
//         }
//         let secondPartOfStr = line.slice(endMark, line.length);
//         console.log("secondPartOfStr:", secondPartOfStr)
//         //first markCharsCount characters that come after the marker:
//         const segment = secondPartOfStr.slice(0, markCharsCount);
//         const expanded = segment.repeat(markRepeatBy)
//         useMarkFunc(segment, markRepeatBy);

//     };

// }

//console.log("counter length:", counterArray)