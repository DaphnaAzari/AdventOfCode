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

//same instructions as last time but now the grid looks entirely
//differen!


const grid = [
    [null, null, '1', null, null],
    [null, '2', '3', '4', null],
    ['5', '6', '7', '8', '9'],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null]
];
console.log(grid)


/// check I need to implement to deal with nulls in my array:
//if (grid[newRow][newCol] !== null)

//get to start position (5) & stores current position:
//row2:
let row = 2;
//first col(0):
let col = 0;
// empty array for code answer:
let codeAnswer = [];


for (const line of lines) {
    for (const move of line) {
        //to calculate new moves:
        let newRow = row;
        let newCol = col;

        switch (move) {
            case 'U': if (newRow > 0) newRow--; break;
            case 'D': if (newRow < 4) newRow++; break;
            case 'L': if (newCol > 0) newCol--; break;
            case 'R': if (newCol < 4) newCol++; break;
        }
        //if location has not landed on null updade:
        if (grid[newRow][newCol] !== null) {
            row = newRow;
            col = newCol;
        }
    }

    // push answer into codeAnswer
    codeAnswer.push(grid[row][col]);
}


//print and join into a string:
console.log("Bathroom code:", codeAnswer.join(''));