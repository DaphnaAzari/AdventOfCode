const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().toString().split('\n');

console.log("lines", lines)

//String rules:
//*contains a pair of two leters that appear in a string at lest twice
//e.g. xyxy (xy) or aabcdefgaa (aa)
///stipulation: they cannot overlap (so not together like 'aaa')

//*at least one letter that has some letter between it and then repeats
//e.g. eye, efe

const goodStrings = [];

//([A-Za-z]{2}) — captures any two alphabet letters

// .* — same line only

//\1 ensures the exact same pair appears again later,
//this automatically prevents overlap!!

function containsCombo(str) {
    // return /([A-Za-z]{2}).*\1/.test(str);

    // return /([A-Za-z]{2}).+?\1/.test(str);

    return /([A-Za-z]{2}).*\1/.test(str)
}


//([A-Za-z]) — captures any single letter

//  . is any character

//  \1 — the same first captured group (which is one letter)

function letterSandwich(str) {

    return /([A-Za-z]).\1/.test(str)


}


for (const line of lines) {
    if ((containsCombo(line)) && (letterSandwich(line))) {
        console.log(line, "contains combo pair & letter Sandwich!");
        goodStrings.push(line);
        console.log(goodStrings)

    }
}

console.log("goodStrings", goodStrings)
console.log("how many goodStrings:", goodStrings.length)
