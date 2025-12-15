const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');
console.log("lines", lines)

//create grid
//start at S
//always moves down
//passes freely through "."
//splitter = "^"
// if ^ then stop and go immedietly to let of right
//if two ^ from either sides they share the middle beam
//create copy of grid to count visited spots in visitedGrid to deal with double
//go through instructions starting at S and add to counter:
//every time a beam hits ^, increment split counter
//count splits at end

// create grid:
let grid = [];
for (const line of lines) {
    const row = [];
    for (let col = 0; col < line.length; col++) {
        row.push(line[col]);
    }
    grid.push(row);
}
console.log("grid:", grid)

// find the starting column of S to use later for starting point
let startCol = grid[0].indexOf("S");

let beamsSplitCounter = 0;

// active beams (each beam is [row, col])
// start 1 row below S: row=1, col=startCol
//beams is an array of active beams so each [] is an array within it
let beams = [[1, startCol]];


let visitedGrid = [];

//every position starts as false, meaning no beam has been here yet:
for (let r = 0; r < grid.length; r++) {
    //make an empty row with the same number of columns as the input grid
    //push falses into the new array
    //grid[0] is the first row of the grid & grid[0].length is the number 
    //of columns in the grid!

    visitedGrid.push(new Array(grid[0].length).fill(false));
}


while (beams.length > 0) {
    //inside the while loop each beam checks the current cell in grid

    // get one beam by using pop:
    let beam = beams.pop();
    //after first loop beam = [1, startCol]
    //beam current location:
    let [row, col] = beam;

    // checks if out of bounds then ignores:
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        continue;
    }

    //visited check
    //// skip already visited cells
    if (visitedGrid[row][col] === true) {
        // already processed this cell
        continue;
    }
    // mark as processed( mark current cell as visited)
    visitedGrid[row][col] = true;


    let cell = grid[row][col];

    if (cell === "." || cell === "S") {
        // move straight down
        //if beam is on an empty space or start- move straight down
        //add one beam at [row + 1, col] to the active list:
        beams.push([row + 1, col]);
    }
    else if (cell === "^") {
        // splitter- count split 
        beamsSplitCounter++;
        //check split location & create 2 beams:
        //down left beam:
        beams.push([row + 1, col - 1]);
        //down right beam:
        beams.push([row + 1, col + 1]);
    }
}

console.log("Total splits:", beamsSplitCounter);

//create a grid of characters
//find the starting column of S and create the first active beam just below
//create a visitedGrid (same size as the input) to remember which cells were already visited

//enter a while loop:
//as long as there is at least one beam in beams, 
//take the last beam using pop()&check where is is
//if the beam is out of bounds or already visited then skip it
//otherwise mark the cell as visited
//if . or S : add a new beam one row down to the list
//if it’s a splitter (^) count a split and add two new beams to the list
//(these beams are down-left and down-right) 
//this keeps going until the beams list is empty
//at the end, beamsSplitCounter tells me how many times the beams split