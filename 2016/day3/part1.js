const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
//array of lines:
const lines = input.trim().toString().split('\n');

//.split(", ")
console.log("lines", lines)


//room full of what looks like triangles, but not all meet requirements
//to be valid a triangle,the sum of any two sides 
//must be larger than the last side. 

let validTriangle = 0;

for (const line of lines) {

    // remove empty strings so I can access the numbers later
    const parts = line.split(' ').filter(x => x !== '');

    console.log(parts);

    //convert to numbers as currently string
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    const c = Number(parts[2]);

    // triangle check:
    if ((a + b) > c && (a + c) > b && (b + c) > a) {
        validTriangle++;
    } else console.log("Not a triangle")
}


console.log("Valid triangles:", validTriangle);
