const fs = require('fs');
const crypto = require('crypto');

const lines = fs.readFileSync('input.txt', 'utf8').trim();
console.log("lines:", lines)
//used the same MD5 function as previously

function md5(input) {
    return crypto.createHash("md5").update(input).digest("hex");
}
//set an empty pass variable and an index starting at 0 as told in info
let password = "";
let index = 0;

//while loop used here so it'll run until we get to the 8 char password
//use an if statment in to make sure we are just pushing the 
//characters when hash starts with 5 zeros, else we move on with index++
while (password.length < 8) {

    //hashed equal to the input & changing number in index:

    const hash = md5(lines + index);

    if (hash.startsWith("00000")) {
        password += hash[5];
        console.log("password:", password, "index", index);
    }

    index++;
}

console.log("password:", password);
