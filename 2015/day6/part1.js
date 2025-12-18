const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().toString().split('\n');

console.log("lines", lines)

//1,000 X 1,000 grid
//santa's configuration:
//* light numbered from 0 - 999 in each direction
//*corners are: 0,0 , 0,999, 999,999 , 999,0
//instructions can be turn on, turn off or toggle
//each pair is oposite corner of rectangular
//e.g: 0,0 - 2,2 refers to 9 lights in a 3,3 square.
//lights start turned off. 
///______________________________

//understand direction by start of the string.
//remove the action text from the line using slice
//split the remaining string at " through " which gives us two parts
//split each coordinate at the comma which gives x and y as numbers.
//return an object with action, x1, y1, x2, y2.


// create 1000x1000 grid of lights, starts OFF initially!! :

const gridSize = 1000;
const lights = [];

//outer loop creates each row.
//inner loop will fill each row with false
//x is row (horizontal)  & y column

const grid = [];

for (const line of lines) {
    const row = [];
    for (let col = 0; col < line.length; col++) {
        row.push(line[col]);
    }
    grid.push(row);
}

// Confirm it looks like your input (prints each row as a string)
console.log(grid.map(r => r.join("")).join("\n"));
//loop over instruction lines (that are in input file):
for (const line of lines) {

    //action will store on/off/toggle but start empty:
    let action = "";
    //store the two coordinates when split:
    let parts = [];


    //slice takes string you count it
    //and add 1 to get to th number you need)
    //e.g. t(0)o(1)g(2)g(3)l(4)e(5)space(7)

    if (line.startsWith("turn on")) {
        action = "on";
        parts = line.slice(8).split(" through ");
    } else if (line.startsWith("turn off")) {
        action = "off";
        parts = line.slice(9).split(" through ");
    } else if (line.startsWith("toggle")) {
        action = "toggle";
        parts = line.slice(7).split(" through ");
    }

    console.log("Line after slicing and splitting:", parts);


    //after slice, parts will give us two corners 
    //e.g:(parts = ["0,0", "2,2"]):

    // get numbers from the line
    //parts[0+1] are strings representing the two corners,
    //I split them at the comma and then convert to a number
    //as currently it is a string
    //use destructuring [x1, y1] like Joshua taught me

    const [x1, y1] = parts[0].split(",").map(Number);
    const [x2, y2] = parts[1].split(",").map(Number);

    console.log("Coordinates x1, y1, x2, y2:", x1, y1, x2, y2);

    // loop over the rectangle and apply the action 
    //reminder: x is row, y is culumn
    // each loop moves one row down

    //inner loop: 
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            if (action === "on") {
                lights[x][y] = true; // turn on
            } else if (action === "off") {
                lights[x][y] = false; // turn off
            } else if (action === "toggle") {
                lights[x][y] = !lights[x][y]; // flip!
            }
        }
    }
}

// checking how many lights are ON
//loop over every row (x), then over every column (y) to check
//if lights are on ( lights[x][y] is true -meaning on)

let count = 0;
for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        if (lights[x][y]) count++;
    }
}

console.log("Number of lights on:", count);

//test issue: “turn off 499,499 through 500,500"
//" would turn off (or leave off) the middle four lights.”

//trick?? 