const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().toString().split('\n');

console.log("lines", lines)


//String rules:
//*at least 3 vowels (aeiou)
//*must contain one letter that appears twice in a row like hixx
//*does not contain strings: ab, cd, pq, or xy even if they are part of previous asks!


// I need to go over lines array and check for specific characterscreate a function
//that checks the characters inside
//i will use a loop over all lines
//then I will call the function to check if it actually meets requirements and once 
//tested I will push it into the goodStrings arr.


const goodStrings = [];
const badStrings = [];

function vowelCheck(str) {
    const vowels = "aeiou";
    let count = 0;

    for (const char of str) {
        if (vowels.includes(char)) {
            count++;
            if (count >= 3) return true;
        }
    }
    return false;
}


function hasDoubleLetters(str) {
    return /([a-zA-Z])\1/.test(str);
}
// checking if at least one element in the aray passes the callback
//returns true if the string contains any of the bad combos.
//& false if it contains none of them.

function doesNotContain(str) {
    const badCombo = ["ab", "cd", "pq", "xy"];
    return !badCombo.some(seq => str.includes(seq));
}

for (const line of lines) {
    if (vowelCheck(line) && hasDoubleLetters(line) && doesNotContain(line)) {
        console.log(line, "has 3+ vowels, two repeating characters & does not contain bad combo!");
        goodStrings.push(line);
        console.log(goodStrings)

    }
}
console.log("goodStrings", goodStrings)
console.log("how many goodStrings:", goodStrings.length)

