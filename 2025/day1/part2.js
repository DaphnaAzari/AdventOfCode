const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

console.log("lines", lines)

//I need to indicate my starting position at 50
//I need to set my rules of:
//numbers go from 0-99 (100 positions), in a circular way
//L  goes left and is lower numbers
//R goes right and is higher numbers

//the password is the number of times the dial is left pointing at zero after 
//any rotation


//part2:
//count every time the dial clicks past 0 
//(like before+ when goes past 0 too!)
//because i need to see every time it hits 0, i need to count steps!
//*warning: 1000 steps ÷ 100 positions = 10 full loops


//starting point as given:
let position = 50;
//how many times the dial lands on 0 after a rotation:
let countZero = 0;

for (let i = 0; i < lines.length; i++) {
    //current instruction string
    const line = lines[i];
    console.log("line:", line)
    const direction = line[0];
    console.log("directions:", direction)
    //from after char 1 to the end
    const distance = Number(line.slice(1));
    console.log("distance", distance)

    // simila logic, to get step: +1 for R, otherwise -1 for L
    let step = 0;

    if (direction === 'L') {
        step = -1;
    } else {
        step = 1;
    }
    //  rotate the dial ,each click/ move a step:
    for (let j = 1; j <= distance; j++) {
        position = (position + step) % 100;

        // fix negative % result
        if (position < 0) position += 100;

        // check if I hit 0
        if (position === 0) countZero++;
    }
}

console.log("password:", countZero);