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

    //update the dial position when rotating safe
    //dial is circular, so kind of rotates over itself
    //&never goes below 0 or above 99

    //R: add distance and then % 100 (+)
    //L: subtract distance and then % 100(-)

    if (direction === 'L') {
        position = (position - distance) % 100;
    } else {
        //R:
        position = (position + distance) % 100;
    }
    //need to deal with negative numbers as answers as the dial doesn't
    //have them
    //we have 100 positions, so if we add 100,
    //it will take us to the positive answer

    // fix of negative % results
    if (position < 0) {
        position += 100;
    }
    //add to counter
    if (position === 0) {
        countZero++;
    }
}

console.log("password:", countZero);
