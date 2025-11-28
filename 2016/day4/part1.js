const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

console.log("lines", lines)


//count letters in the name (no dashes)

//find 5  most used letters

//check if they match the checksum

//add the room’s ID to the total.

//________

let totalSectorId = 0;

for (let roomIndex = 0; roomIndex < lines.length; roomIndex++) {
    // get the current room string:
    let room = lines[roomIndex];

    //find the last dash:
    let lastDashIndex = room.lastIndexOf('-');
    //get name part: 
    let namePart = room.slice(0, lastDashIndex);
    //id & checksum bit:
    let idAndChecksum = room.slice(lastDashIndex + 1);
    //dashes out from name:
    let nameLetters = namePart.split('-').join('');
    console.log("nameLetters", nameLetters)
    // find [:
    let bracketIndex = idAndChecksum.indexOf('[');
    // id:                    
    let sectorId = parseInt(idAndChecksum.slice(0, bracketIndex));
    console.log("sectorId", sectorId)
    // checksum but remove closing bracket     
    let checksum = idAndChecksum.slice(bracketIndex + 1).replace(']', '');
    console.log("checksum", checksum)

    //count letters in name part:

    let counts = {};

    for (let i = 0; i < nameLetters.length; i++) {
        //loop over each character in nameLetters & check if counted
        let letter = nameLetters[i];
        if (counts[letter]) {
            counts[letter] += 1;
            //if not counted yet, we set it to 1
        } else {
            counts[letter] = 1;

        }
        console.log("counts:", counts)

    }

    //change from object to array: ( get letetrs to be ['a','b','z'...])
    //object keys
    let letterCounts = Object.keys(counts).map(letter => [letter, counts[letter]]);

    //pick top 5:
    let idCheckNum = '';

    for (let i = 0; i < 5; i++) {

        let maxCount = 0;
        let maxLetter = '';

        for (let j = 0; j < Object.keys(counts).length; j++) {
            let letter = Object.keys(counts)[j];
            let count = counts[letter];
            //if two letters have same count , abc:
            if (count > maxCount || (count === maxCount && letter < maxLetter)) {
                maxCount = count;
                maxLetter = letter;
            }
        }

        idCheckNum += maxLetter;
        //reset so I'm not counting again:
        counts[maxLetter] = 0;
    }
    //checksum compare & add Id if real room:

    if (idCheckNum === checksum) {
        totalSectorId += sectorId;
    }

}
console.log("Total real room sector ID:", totalSectorId);





