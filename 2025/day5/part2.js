const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

//In part two I don't need the second part of the input at all, only ranges
//I need to parse all ranges
//sort them by start value
//merge overlapping ranges
//sum fresh IDs

let ingredientIdRanges = [];

// grab all range lines out of input
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('-')) {
        ingredientIdRanges.push(lines[i]);
    }
}

// parse ranges strings into [start, end] arrays that have numbers
let parsedRanges = [];
for (let i = 0; i < ingredientIdRanges.length; i++) {
    let parts = ingredientIdRanges[i].split('-');
    let start = Number(parts[0]);
    let end = Number(parts[1]);
    parsedRanges.push([start, end]);
    console.log("parsedRanges:", parsedRanges)
}

//sort ranges using the start and end (a[0] - b[0] means smallest comes first)
parsedRanges.sort(function (a, b) {
    return a[0] - b[0];
});

// merge overlapping ranges
let merged = [];
for (let i = 0; i < parsedRanges.length; i++) {
    let current = parsedRanges[i];
    //If merged is empty, push the first range:
    if (merged.length === 0) {
        merged.push(current);
    } else {
        //take -1 of the merged arr to get the last element added:
        let last = merged[merged.length - 1];
        //compare current range with last merged range:
        // check overlap
        if (current[0] <= last[1]) {
            // merge by extending the end
            //current[0]is start of current range
            //& last[1] is end of last merged range
            //if start of current range is less than/equal to
            // the end of the last range they overlap!!

            if (current[1] > last[1]) {
                last[1] = current[1];
            }
        } else {
            merged.push(current);
        }
    }
}

// count total fresh IDs:
//loop to make sure I get all the numbers in the ranges not only start and end
let totalFresh = 0;
for (let i = 0; i < merged.length; i++) {
    //merged[i][1]is end of the range
    //merged[i][0] is start of the range
    //end - start + 1 counts all numbers in the range at both ends
    totalFresh += merged[i][1] - merged[i][0] + 1;
}

console.log("Fresh IDs total:", totalFresh);