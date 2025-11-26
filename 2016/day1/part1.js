const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().toString().split(", ");
//('\n');

console.log("lines", lines)



//I'm next to EasterBunny's Headquarters, I have instructions and I am 
//close but I have to solve the puzzle

//given a specific coordinates -> face north.
//after that follow sequence:
//either turn left (L) or right (R) 90 degrees, 
//then walk forward the given number of blocks, 
//ending at a new intersection.

//I can only walk on street grid of the city? 

//I need to look at the directions and then 
//see what is the shortest way to the fount spot

//_______________
//Initially:
//If I'm facing North and walk 1 block-> go up.

//If I'm facing East and walk 1 block-> go right.

//If I'm facing South and walk 1 block->go down.

//If I'm facing West and walk 1 block->go left.
//________________

//given no specific number, I can start with coordinates (0,0)
//then I need to update location based on instructions to 
//eventually get final x and final y

//I start facing north:

let direction = "N";

//starting point coordinates:

let x = 0;
let y = 0;

//to declare my instructions using my input file:

const instructions = lines;

//I loop over instructions
for (let inst of instructions) {

    //to indicate L/R because instructions could be something liek L5:
    //i'm tring to get to L or R using index. 
    const turn = inst[0];
    //to get access to the number after the letter& make it a num
    //anything after L/R is covered in Number as it is currently a string
    const steps = Number(inst.slice(1));
    //to understand what happens when I am located in every direction
    //use if statements, using turnurary instead of writing each option

    if (direction === "N") {
        direction = (turn === "R") ? "E" : "W";
    } else if (direction === "E") {
        direction = (turn === "R") ? "S" : "N";
    } else if (direction === "S") {
        direction = (turn === "R") ? "W" : "E";
    } else if (direction === "W") {
        direction = (turn === "R") ? "N" : "S";
    }

    //calculations of moves in new directions
    // (x horizon, y vertical axis):

    if (direction === "N") {
        y += steps;
    } else if (direction === "S") {
        y -= steps;
    } else if (direction === "E") {
        x += steps;
    } else if (direction === "W") {
        x -= steps;
    }

}
console.log("current x,y :", x, y);

//use Math.abs as this is absolute value (no negatives):
let distance = Math.abs(x) + Math.abs(y);
console.log("Final position:", x, y);
console.log("Blocks away:", distance);
