const fs = require('fs');

const input = fs.readFileSync('testInput.txt', 'utf8');

const lines = input.trim().toString().split('\n');

console.log("lines", lines)

//identifier is made from lowercase letter,
//made from 16 integers?
//a signal gets value from either gate,direct number, or a wire
//it can provide it's signal to several locations

//gate- only provides signal when all his inputs have signal.
//gate's actions: AND, OR, NOT, LSHIFT, RSHIFT.

//  X AND Y -> Z   means ti connect wires x and y to AND gate, 
//and then connect it's output to wire z. 


