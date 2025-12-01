const fs = require('fs');
const crypto = require('crypto');

const lines = fs.readFileSync('input.txt', 'utf8').trim();
console.log("lines:", lines)
//used the same MD5 function as previously

function md5(input) {
    return crypto.createHash("md5").update(input).digest("hex");
}

//Part2:
//still looking for hash with 5 zeros.
//now 6th char represents possition of char in the password
//positions are 0-7
//now 7th char represents the character itself.



//set an empty pass veriable and an index starting at 0 as told in info
//before password was an empty string, now it needs to be an arr
//i have to fill it with something to begin with
let password = new Array(8).fill(null);
let index = 0;

//while loop used here so it'll run until we get to the 8 char password
//use an if statment in to make sure we are just pushing the 
//characters when hash starts with 5 zeros, else we move on with index++

console.log("passlength:", password.length)
while (password.includes(null)) {

    //hashed equal to the input & changing number in index:

    const hash = md5(lines + index);

    if (hash.startsWith("00000")) {
        console.log("hash:", hash);
        console.log("index", index);
        let position = hash[5];

        //if position is smaller than 8 &
        //password posission === null, similar to before
        if (position < 8 && password[position] === null) {
            //changed the index to 6 for 7th char:
            password[position] = hash[6];
            console.log("password:", password, "position", position);
        }
    }

    index++;
}

console.log("password string:", password.toString().replace(/,/g, ""))

//issue is password is an arr, so i had to string it, 
//then because it was an arr it came with commas
//so to get to the password I tried to do s regular split on it which didnt work
//so I used replace using regex to get rid of it.





