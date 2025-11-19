const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('');

console.log("lines", lines)


//move are always exsactly 1 house to the north (^), south(v), east(>), or west (<)
//after each move santa delivers a present. 
//mistake-santa visiting houses several times due to directions missleading

//i need to see how may houses recieve at least one present,
// meaning that santa visited a min of 1 time. 


//tasks:
//create a grid that is large enough to handle santa's movements
//track santa's movement across the grid
//check which houses have at least one gift

//create a grid:
//created an empty starting array, created a loop to push inner arrays 
//into the starting array and then created another empty array within it and pushed Xs 
//so we have visibility of the grid. As long as the loops' length is the same this works
//as I've tested it out. 

let statringArray = [];

const markAsP = (vertical, horizontal, statringArray) => {
    statringArray[vertical][horizontal] = 'P';
}
//this method needs to calculate where santa visited at least once. 
const calculatePresents = (statringArray) => {
    let counter = 0;

    for (const innerArr of statringArray) {
        counter += innerArr.filter(house => house == 'P').length

    }
    console.log("counter:", counter)
}

for (let i = 0; i < 500; i++) {
    let innerArray = [];
    // I want to push a symbol into the inner array 5 times. 
    for (let j = 0; j < 500; j++) {
        innerArray.push('x')
    }
    statringArray.push(innerArray);
}

//santa's movement across grid:
//where doest he start: this is relative, the grid is infinite so we can define our 
//small grid to begin with and when it is extended it is extended to all directions
//so we can use a test case that should be applicable to any size.
//conditional for all 4 inputs:
let horizontal = 250;
let vertical = 250;

// console.log("startingArray", statringArray)
markAsP(vertical, horizontal, statringArray)
// console.log("startingArray- after first mark", statringArray)


for (const direction of lines) {


    if (direction === '>') {
        horizontal++
    };
    if (direction === '<') {
        horizontal--
    };
    if (direction === '^') {
        vertical--
    };
    if (direction === 'v') {
        vertical++
    };
    // console.log("vertical", vertical)
    // console.log("horizontal", horizontal)
    markAsP(vertical, horizontal, statringArray)
    // console.log("startingArray- after conditionals:", statringArray)
}

calculatePresents(statringArray)

