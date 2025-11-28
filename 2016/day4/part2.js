const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

console.log("lines", lines)

// part2:
// move letter forward by sectorId (+ sectorId)
// - becomes a space!
// find the room that contains "northpole"
// answer is the sector ID of that room


// I don't need totalSectorId for part2

for (let roomIndex = 0; roomIndex < lines.length; roomIndex++) {
    // get the current room string
    let room = lines[roomIndex];

    // find the last dash
    let lastDashIndex = room.lastIndexOf('-');

    // get name part
    let namePart = room.slice(0, lastDashIndex);

    // id & checksum bit
    let idAndChecksum = room.slice(lastDashIndex + 1);

    // remove dashes for counting letters
    let nameLetters = namePart.split('-').join('');
    // console.log("nameLetters", nameLetters);

    // find [
    let bracketIndex = idAndChecksum.indexOf('[');

    // sector ID
    let sectorId = parseInt(idAndChecksum.slice(0, bracketIndex));
    // console.log("sectorId", sectorId);

    // checksum (remove closing bracket)
    let checksum = idAndChecksum.slice(bracketIndex + 1).replace(']', '');
    // console.log("checksum", checksum);

    // count letters for checksum
    let counts = {};
    for (let i = 0; i < nameLetters.length; i++) {
        let letter = nameLetters[i];
        counts[letter] = (counts[letter] || 0) + 1;
    }

    // calculate top 5 letters for checksum
    let idCheckNum = '';
    for (let i = 0; i < 5; i++) {
        let maxCount = 0;
        let maxLetter = '';
        const letters = Object.keys(counts);
        for (let j = 0; j < letters.length; j++) {
            let letter = letters[j];
            let count = counts[letter];
            if (count > maxCount || (count === maxCount && letter < maxLetter)) {
                maxCount = count;
                maxLetter = letter;
            }
        }
        idCheckNum += maxLetter;
        counts[maxLetter] = 0; // reset so not counted again
    }
    ///******new */
    // only decrypt if the room is real (checksum matches)
    if (idCheckNum === checksum) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        function letterToNumber(letter) {
            // a=0, b=1  etc, will deal with added one later
            return alphabet.indexOf(letter);
        }
        //reverse of letterToNumber:
        //needed because after shifting a letter by sectorId, 
        //we convert it back to a letter to add to the decrypted string

        function numberToLetter(number) {
            return alphabet[number % 26];
        }
        //loop over namePart (what I used to seperate the letter section) 
        // decrypt the room name using alphabet 
        let decryptedName = "";

        for (let char of namePart) {

            //change - to a space:

            if (char === "-") {
                // replace dash with space
                decryptedName += " ";
            } else {
                //calling my function with the char to convert to number:

                let num = letterToNumber(char);
                let shifted = (num + sectorId) % 26;
                decryptedName += numberToLetter(shifted);
            }
        }

        // print if this is the northpole storage room
        if (decryptedName.includes("northpole")) {
            console.log("NORTHPOLE name:", decryptedName, "sectorId:", sectorId);
        }
    }

}
