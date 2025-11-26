const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
//array of lines:
const lines = input.trim().toString().split('\n');

//.split(", ")
console.log("lines", lines)


//each button can befound by starting on the previous button
//and moving to the adjesent button 
// U- up
// D - down
// L - left
// R - right
// each line of instructions corresponds to one button (that starts
// at the pereviou button & for first line the 5 button!)
//if a move does not lead to a button ignore it and move on.


//create grid (3X3):
const grid = [];
let n = 1;

for (let row = 0; row < 3; row++) {
    //creates a new row:
    const current = [];
    for (let col = 0; col < 3; col++) {
        //push numbers into the created row:
        current.push(n++)
    }
    //push row into grid:
    grid.push(current)
}
console.log(grid)

//get to start position (5):
//middle row:
let row = 1;
//middle column:
let col = 1;
// srt empty array for code answer:
let codeAnswer = [];

for (let line of lines) {
    // iterate over every character in the line
    for (let move of line) {
        switch (move) {
            // move up if not at top, decreasing a row
            case 'U':
                if (row > 0) row--;
                break;
            // move down if not at bottom
            //down by increasing a row
            case 'D':
                if (row < 2) row++;
                break;
            // move left if not at left edge
            //move left by decreasing col
            case 'L':
                if (col > 0) col--;
                break;
            // move right if not at right edge
            //move right by increasing col
            case 'R':
                if (col < 2) col++;
                break;
        }
    }
    // push into codeAnswer arr
    codeAnswer.push(grid[row][col]);
}

//print and join into a string:
console.log("Bathroom code:", codeAnswer.join(''));
