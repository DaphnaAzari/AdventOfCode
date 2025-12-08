const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split('\n');
console.log("lines", lines);

//database is my puzzle input
//ingredients IDs are ranges, I need access to all the numbers in the range
//ranges can overlap
//there is a blank line between ingredientIds and available ingredients
//I need to essentially check if the available ingredients are within the ranges
//that means they are fresh, otherwise they are spoilt
//my answer is the fresh ingredients

let ingredientIdRanges = [];

let availableIngredients = [];

freshIngredients = 0;

for (const line of lines) {
    if (line.includes('-')) {
        ingredientIdRanges.push(line)

    } if (!line.includes('-') && line !== "") {
        availableIngredients.push(line)
    }

}
console.log("ingredientIdRanges", ingredientIdRanges)
console.log("availableIngredients", availableIngredients)

// let dash = ingredientIdRanges.indexOf("-");
// console.log("dash", dash)
// let ingredientIdFirstNum = ingredientIdRanges.slice(0, dash);
// console.log("ingredientIdFirstNum", ingredientIdFirstNum)
// let ingredientIdSecondNum = ingredientIdRanges.slice(dash + 1, -1)
// console.log("ingredientIdSecondNum", ingredientIdSecondNum)


for (const ingredient of availableIngredients) {
    //parse into num:
    const num = Number(ingredient);

    //parse ranges into nums, seperate by comma and create start and end variables:
    const parsedRanges = ingredientIdRanges.map(range => {
        const [start, end] = range.split('-').map(Number);
        return [start, end];
    });

    let isFresh = false;
    //loop over to check if fresh, essentially if larger or equal to start
    //&smalled or equal to end if it meets that change value of fresh to true
    for (const [start, end] of parsedRanges) {
        if (num >= start && num <= end) {
            isFresh = true;
            break;
        }
    }
    //add to freshIngredients array
    if (isFresh) {
        freshIngredients++;
    }
}
console.log("freshIngredients", freshIngredients);
