const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');
console.log("lines", lines);


//@ (paper rolls)are orginized in a grid
//forklift access@: only if there are fewer than 4 rolls
// in the 8 adjesent positions
//create grid to put lines into
//loop through each line and then each character
//push each character into row arraw
//push row into grid
//then grid[rowIndex][colIndex] will give me chars in this positions

const grid = [];

for (const line of lines) {
    // row for this line       
    const row = [];
    // loop over columns
    for (let col = 0; col < line.length; col++) {
        //push characters into row
        row.push(line[col]);
    }
    // push completed row into grid
    grid.push(row);
}

//check for neighbours: 
//[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]

// store positions [rowIndex, colIndex]
let accessibleRolls = [];

// loop over each row and cell in grid and check if cells are "@""
//each cell will be a char in the row
//Outer l: loops over each row, inner l:loops over each column inside that row 
//and gives me a cell and col index

grid.forEach((row, rowIndex) => {
    // loop over each column in the row :
    row.forEach((cell, colIndex) => {
        // only consider ones with @:
        if (cell === '@') {

            //  neighbor directions: 8 cells surrounding mya given cell:
            const neighborOffsets = [
                [-1, -1], [-1, 0], [-1, 1], [0, -1],
                [0, 1], [1, -1], [1, 0], [1, 1]
            ];

            let neighborPaperCount = 0;
            //loop over each neighbour offset:
            neighborOffsets.forEach(([rowOffset, colOffset]) => {
                //rowIndex & colIndex are the row & col of current cell we are checking
                //each pair of rowOffset&colOffset tells how far the neighbor is from current cell

                //current cell: [rowIndex, colIndex]
                //N offset: [rowOffset, colOffset]
                //N cell = [rowIndex + rowOffset, colIndex + colOffset]
                //offset is difference between the current cell and the neighbor cell

                const neighborRow = rowIndex + rowOffset;
                const neighborCol = colIndex + colOffset;

                // check bounds to see that we are inside grid still!
                //neighborRow >= 0 : prevents going above the top of the grid
                //neighborRow < grid.length:prevents going below the bottom of the grid
                //neighborCol >= 0: prevents going left outside the grid
                //neighborCol < row.length:prevents going right outside the grid

                if (
                    neighborRow >= 0 && neighborRow < grid.length &&
                    neighborCol >= 0 && neighborCol < row.length
                ) {

                    //each time a neighbor is @, increase the count:
                    if (grid[neighborRow][neighborCol] === '@') {
                        neighborPaperCount++;
                    }
                }
            });

            // fewer than 4 neighbors means accessible
            if (neighborPaperCount < 4) {
                accessibleRolls.push([rowIndex, colIndex]);
            }
        }
    });
});

console.log("Number of accessible rolls:", accessibleRolls.length);