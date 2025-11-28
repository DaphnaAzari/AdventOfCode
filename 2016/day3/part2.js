const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

console.log("lines", lines)

//look at each row in the input
//break the row into numbers, ignore extra spaces.
//put the first number into colOne, second colTwo, third colThree.
//when column arr has 3 numbers, check if it makes a triangle using a function
//after checking, empty the column arr to collect the next 3 numbers
//repeat for all rows
//count all triangles that are valid.



// valit triangle variable like before + arrays for each column
let validTriangles = 0;
let colOne = [];
let colTwo = [];
let colThree = [];

//function created as to not repreat again
function isValidTriangle([a, b, c]) {
    return a + b > c && a + c > b && b + c > a;
}
// loop through each row:
for (let i = 0; i < lines.length; i++) {
    // split the row into pieces
    const pieces = lines[i].split(' ');

    // remove empty strings
    const filtered = pieces.filter(x => x !== '');

    // convert to numbers
    const parts = filtered.map(Number);

    // add numbers to the correct column arrays
    colOne.push(parts[0]);
    colTwo.push(parts[1]);
    colThree.push(parts[2]);

    // check each column has three nums and then use valid function on it:
    if (colOne.length === 3) {
        if (isValidTriangle(colOne)) validTriangles++;
        // reset for next triangle
        colOne = [];
    }

    if (colTwo.length === 3) {
        if (isValidTriangle(colTwo)) validTriangles++;
        colTwo = [];
    }

    if (colThree.length === 3) {
        if (isValidTriangle(colThree)) validTriangles++;
        colThree = [];
    }
}


console.log("Valid triangles:", validTriangles);