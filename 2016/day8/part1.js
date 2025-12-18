const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');

console.log("lines", lines)

//create a grid begin with everything off: "." 

let gridLength = 50;
let gridHeight = 6;

let grid = [];

for (let row = 0; row < gridHeight; row++) {
    grid.push(new Array(gridLength).fill("."));
}

console.log("grid:", grid)

function doRect(line) {

    //to get this:["rect", "3x2"]:
    let parts = line.split(" ");

    //split at x to get ["3", "2"]
    //size[0] is width string & size[1] is height string
    let size = parts[1].split("x");
    console.log("size[0]:", size[0])
    console.log("size[1]:", size[1])
    //convert strings to nums:
    let width = Number(size[0]);
    let height = Number(size[1]);

    //row loop:
    for (let y = 0; y < height; y++) {
        //x is the column index:
        for (let x = 0; x < width; x++) {
            //change from off (".") to on in these spots:
            grid[y][x] = "#";
        }
    }
}

function rotateRow(line) {
    // split gives me eg.["rotate", "row", "y=A", "by", "B"]
    let parts = line.split(" ");

    //part2 would be y=A:
    //parts[2].split("=")  would make it ["y", "A"] and 1 would give me the second element:
    let row = Number(parts[2].split("=")[1]);
    //this gives by pixel B in this case:
    //and convert to num
    let shift = Number(parts[4]);

    //temporary use to be updated after loop:
    let newRow = new Array(gridLength).fill(".");

    //loop throw row and see for every pixel in this row
    // figure out where it should go after the rotation:
    for (let x = 0; x < gridLength; x++) {
        //x is column, gridLength is the screen width(50)
        //needs to loop around itself
        let newX = (x + shift) % gridLength;
        //reads the pixel at the current column x in the original row
        //grid[row][x] is the old value
        //newX is the new column index after rotation
        newRow[newX] = grid[row][x];
    }
    //update  the grid after loop:
    grid[row] = newRow;
}


function rotateColumn(line) {
    let parts = line.split(" ");
    //column index to rotate:
    let col = Number(parts[2].split("=")[1]);
    // how many pixels to rotate down:
    let shift = Number(parts[4]);
    //a temporary new column array:
    let newCol = new Array(gridHeight).fill(".");
    //loop through each row
    for (let y = 0; y < gridHeight; y++) {
        //circular rotation downward using y, usim modulo like before
        let newY = (y + shift) % gridHeight;
        newCol[newY] = grid[y][col];
    }

    for (let y = 0; y < gridHeight; y++) {
        //rotated column back into the actual grid:
        grid[y][col] = newCol[y];
    }
}
//loop through instructions to get the right op:

for (let line of lines) {
    if (line.startsWith("rect")) {
        doRect(line);
    } else if (line.startsWith("rotate row")) {
        rotateRow(line);
    } else if (line.startsWith("rotate column")) {
        rotateColumn(line);
    }
}

//count lit pixes:
let count = 0;
// loop over each row
for (let row of grid) {
    // loop over each pixel in the row     
    for (let pixel of row) {
        // check if pixel is on, it it is att to count:
        if (pixel === "#") {
            count++;
        }
    }
}

console.log("count:", count);
