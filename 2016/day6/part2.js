const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

console.log("lines", lines)

//current input is array with strings
//testInput strings are 6 long
//inpute strings are 8 long

//seperate lines into arrays of columns
//for each column:
//count how many times each letter appears in column & figure out most used
//store most common letter from that column in a new array

//Part two is very similar to before, I really just changed the max to min count
// and renamed my function.

///////

//lines[0] is the first row
//messageLength is how many characters are in a row.

const messageLength = lines[0].length;
const columns = [];

//make empty arrays for each column:
for (let i = 0; i < messageLength; i++) {
    columns.push([]);
}

// fill columns with letters from each row
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < messageLength; j++) {
        columns[j].push(lines[i][j]);
    }
}

// every array in columns contains all letters in that column
console.log("columns:", columns);


//I need to find the most common letter in each column:

//make list of letters that came up so far
//make a matching list that stores how many times each letter appears
//go through each letter in the column:
//if new write it down & start counting
//if it's not increase counter
// see which letter has the biggest count and return it


let finalMessage = "";
//this loops through each column
//FindMostUsedLetter to get the most common letter in every column
for (let col = 0; col < columns.length; col++) {
    const mostUsed = FindLeastUsedLetter(columns[col]);
    finalMessage += mostUsed;
}

console.log("final message:", finalMessage);


function FindLeastUsedLetter(letters) {
    //letters seen:
    const seenLetters = [];
    //count of letters:
    const countOfLetters = [];
    // count of how many times each letter appears:
    for (let i = 0; i < letters.length; i++) {
        //get current letter:
        const letter = letters[i];
        //if letter is not in seenLetters
        if (!seenLetters.includes(letter)) {
            // this letter has NOT been seen yet
            // add it to the list of seen letters
            seenLetters.push(letter);
            // start counting it    
            countOfLetters.push(1);
        } else {
            // this letter has been seen before
            // I need to find the index of the letter:
            const index = seenLetters.indexOf(letter);
            // increase its count
            countOfLetters[index]++;
        }
        // log the current state after each letter
        console.log(" letter", letter)
        console.log(" seenLetters:", seenLetters)
        console.log("countOfLetters:", countOfLetters)

    }
    //now I need to find the min used
    //minIndex starts at 0
    let minIndex = 0;

    countOfLetters.forEach((count, i) => {
        //countOfLetters[minIndex] is the count of the current least common letter
        // I need to compare the current letter count which is count
        // with the current min.
        if (count < countOfLetters[minIndex]) {
            //if the current letter appears more times, we update maxIndex
            minIndex = i;

        }
    });

    //show the letter that appeared most often in column:
    return seenLetters[minIndex];
}

//split the input into columns:
//I started with my rows of letters
//for each column, created a separate array containing all the letters
// in that column

//count letters in each column:
//for each column array, I used a function `FindMostUsedLetter` to 
//count how many times each letter appeared
//also keeping track of letters -`seenLetters` 
//and how many times each appeared- `countOfLetters`

//find the most common letter in the column:
//after counting all letters, saw which letter appeared the most in that column
//(that letter is the “most used” for that column)

//build the final message:
//took the most common letter from each column and added it to `finalMessage`