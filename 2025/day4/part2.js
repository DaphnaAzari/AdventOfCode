const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');
console.log("lines", lines);

//part 2
//in the first part I checked how many rolls are currently available. 
//in this part,I need to do the same, then remove them
//then I need to see my grid with the new positions
//and start all over again until I cannot remove any more rolls

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
function findAccessibleRolls(grid) {
    let accessibleRolls = [];

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell === '@') {

                const neighborOffsets = [
                    [-1, -1], [-1, 0], [-1, 1], [0, -1],
                    [0, 1], [1, -1], [1, 0], [1, 1]
                ];

                let neighborPaperCount = 0;
                neighborOffsets.forEach(([rowOffset, colOffset]) => {
                    //offset is difference between the current cell and the neighbor cell

                    const neighborRow = rowIndex + rowOffset;
                    const neighborCol = colIndex + colOffset;

                    if (
                        neighborRow >= 0 && neighborRow < grid.length &&
                        neighborCol >= 0 && neighborCol < row.length
                    ) {
                        if (grid[neighborRow][neighborCol] === '@') {
                            neighborPaperCount++;
                        }
                    }
                });

                if (neighborPaperCount < 4) {
                    accessibleRolls.push([rowIndex, colIndex]);
                }
            }
        });
    });

    console.log("Number of accessible rolls:", accessibleRolls.length);
    return accessibleRolls;

}
//new:

//remove every accessible roll from grid and see new grid

let totalRemoved = 0;

while (true) {

    // find all accessible rolls in the current grid using function created above
    const accessibleRolls = findAccessibleRolls(grid);

    // stop if no accessible rolls left
    if (accessibleRolls.length === 0) break;

    // remove the accessible rolls from the grid by changing value like in
    //example:
    accessibleRolls.forEach(([row, col]) => {
        grid[row][col] = '.';
    });
    //update the totla removed:
    totalRemoved += accessibleRolls.length;
}
console.log("Total rolls removed:", totalRemoved);
