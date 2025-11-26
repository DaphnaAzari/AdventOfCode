const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().toString().split(", ");
//('\n');

console.log("lines", lines)


//instructions were wrong and we are actually looking for:
//the first location I visited twice and how many blocks away it is
// I need to create a place when I am putting in my coordinates
//that way when I see it happen again I break the loop and I know 
//that that is my first visisted twice spot, and i get the blocks of it
let direction = "N";

//starting point coordinates:

let x = 0;
let y = 0;
//track all visited locations:
//added 0,0 as I visited it when I started this
//added with "" so it is a string, when we can use later
//when comparing locations
const visited = ["0,0"];

//store the first coordinate visited twice, initially includes 
//nothing 
let firstRevisit = null;

//to declare my instructions using my input file:

const instructions = lines;

//loop same as before:

for (let inst of instructions) {
    //get R/l:
    const turn = inst[0];
    //get steps and convert string to num:
    const steps = Number(inst.slice(1));

    //this tells me where I face after turning:
    if (direction === "N") direction = (turn === "R") ? "E" : "W";
    else if (direction === "E") direction = (turn === "R") ? "S" : "N";
    else if (direction === "S") direction = (turn === "R") ? "W" : "E";
    else if (direction === "W") direction = (turn === "R") ? "N" : "S";

    // innner loop needs to move one at a time
    //steps was converted already to a number from a string earlier
    //and therefore we do not need to do steps.length here

    for (let i = 0; i < steps; i++) {
        if (direction === "N") y += 1;
        else if (direction === "S") y -= 1;
        else if (direction === "E") x += 1;
        else if (direction === "W") x -= 1;

        //creating a string of my location:
        const coordinates = `${x},${y}`; // current location
        console.log("coordinates:", coordinates)

        // Check if visited already
        if (visited.includes(coordinates)) {
            console.log("first visited twice:", coordinates);
            //store coordinates in firstRevisit:
            firstRevisit = coordinates;
            break;
        }
        visited.push(coordinates); // add current block to visited
        console.log("visited", visited)

    }

    // if we found first revisit, stop outer loop too
    if (firstRevisit !== null) break;
}

// Calculate the distance to the repeated location:
//if it's not equal to null meaning it has something in it
if (firstRevisit !== null) {
    //first revisisted is a string of two nums seperated by a comma,
    //so I split it by the comma to get two numbers
    let parts = firstRevisit.split(",");

    // convert to numbs:
    let revistedX = Number(parts[0]); // x coordinate
    let revisitedY = Number(parts[1]); // y coordinate

    // manhattan distance = x + y
    let distance = Math.abs(revistedX) + Math.abs(revisitedY);

    console.log("first location visited twice:", firstRevisit);
    console.log("Blocks away:", distance);
} else {
    console.log("No location was visited twice");
}