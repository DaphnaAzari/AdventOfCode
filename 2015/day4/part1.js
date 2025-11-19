const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim();
//changed this because the input was going to be letters seperated by commas etc:
// essentially test input abcdef -> "a","b","c"...

//.split('');

console.log("lines", lines)

//this is used in order to access MD5:
const crypto = require("crypto");

// I have to use MD5 function 
//this function means the output always starts with 5 zeros (00000value)
//in order to mine the coins, I need to find 
//the lowest POSITIVE number after the input is hashed. 

// read the secret key (yzbqklnj)/ input.

// add increasing integers:
// yzbqklnj1, yzbqklnj2, yzbqklnj3, …

// for each one do the MD5 hash.

// check if the hash starts with 000000

// stop when you find the first integer that works & log out


function md5(input) {
    return crypto.createHash("md5").update(input).digest("hex");
}

// const answer = md5("abcdef609043");
// console.log("answer", answer)

//zero is not a positive integer!!!! so have to start with 1!
let i = 1;


while (true) {

    //hashed to be equal to the testfile info+ the changing number "i" i am testing
    const hash = md5(lines + i);

    // if hash starts with 00000 i need to stop
    if (hash.startsWith("00000")) {
        break;
    }

    i++; // try the next number
}
console.log(i);



