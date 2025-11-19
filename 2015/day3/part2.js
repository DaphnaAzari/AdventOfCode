const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('');

console.log("lines", lines)

//use grid from last time

let statringArray = [];

//mark with P for present like last time:
const markAsP = (vertical, horizontal, statringArray) => {
    statringArray[vertical][horizontal] = 'P';
}


//this method needs to calculate where santa visited at least once(from part1)
const calculatePresents = (statringArray) => {
    let counter = 0;

    for (const innerArr of statringArray) {
        counter += innerArr.filter(house => house == 'P').length

    }
    console.log("counter:", counter)
}

for (let i = 0; i < 500; i++) {
    let innerArray = [];
    for (let j = 0; j < 500; j++) {
        innerArray.push('x');
    }
    statringArray.push(innerArray);
}


//set current location like we did before but for both of them:
let santaHorizontal = 250;
let santaVertical = 250;

let roboHorizontal = 250;
let roboVertical = 250;

//santa is the first turn so we set him here:
markAsP(santaVertical, santaHorizontal, statringArray); // starting house gets a present

let turnCounter = 0;

for (const direction of lines) {
    // for part 2: we need to figure out whos turn it is:

    //we need to capture the tun info in a variable:

    let turn = turnCounter % 2;
    if (turn === 0) {
        //santa's turn
        //inside the turn we need to: 

        //1. find out where they currently are;
        //already stored in horizontal, vertical
        //2.directions of where they are going
        if (direction === '>') santaHorizontal++;
        if (direction === '<') santaHorizontal--;
        if (direction === '^') santaVertical--;
        if (direction === 'v') santaVertical++;
        //3.mark as p:
        markAsP(santaVertical, santaHorizontal, statringArray);
        //4.turnCounter ++:
        turnCounter++;

    } else {
        //Robo's turn
        //inside the turn we need to: 

        //1. find out where they currently are;

        //2.directions of where they are going
        if (direction === '>') roboHorizontal++;
        if (direction === '<') roboHorizontal--;
        if (direction === '^') roboVertical--;
        if (direction === 'v') roboVertical++;
        //3.mark as p:
        markAsP(roboVertical, roboHorizontal, statringArray);
        //4.turnCounter ++:
        turnCounter++;
    }

}


calculatePresents(statringArray)

//____________________________________

//Part 2:

//facts: 
//Santa & Robo start at the same location, and leave 2 gifts at first house. 
//They take turns moving.

//I need to find out how many houses recieve at least 1 gift. 
//to do that I need to find a way to track Santa's movement (part1)
//and a way to track robos movement. 
//I need to add these to a tracker to see how many houses overall recieved gifts. 
//then check if they were already visited.

//possible idea would be to use a "new Set()" this is similar to a list,
//but it does not allow duplicates. This way if I make a set for Santa
//and a set for robo, it will count only once for each player- however I need to
//understand something because i believe we are able to have two gifts on the same 
//house so I think after I count it up, I need to compare the two lists and if
//any of the houses were visisted by both santa and robo I need to subtract that
//from the result?

// maybe I can use Modulus, and for each to figure out the turn and then use set to
//check if that position was already taken?

// first turn would be :
// const sMoves = [];
// const rMoves = [];

// moves.forEach((move, index) => {
//   const turnNumber = index + 1;

//   if (turnNumber % 2 === 1) {
//     sMoves.push(move);
//   } else {
//     rMoves.push(move);
//   }
// });




