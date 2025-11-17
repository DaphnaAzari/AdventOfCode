const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.trim().split('\n');

// const surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
// (l*w) (w*h) (h*l) smallest one from these is added to surfacearea

const calculateArea = (measurementOne, measurementTwo) => {
    return 2 * measurementOne * measurementTwo;
}

const presentCalcArray = [];
for (const measurements of lines) {
    const measArray = measurements.split('x');

    // const { length, width, height } = measArray

    const length = measArray[0];
    const width = measArray[1];
    const height = measArray[2];

    const lengthByWidth = calculateArea(length, width);
    const widthByHeight = calculateArea(width, height);
    const heightByLength = calculateArea(height, length)

    const surfaceAreaArr = [lengthByWidth, widthByHeight, heightByLength];
    surfaceAreaArr.sort((a, b) => a - b)
    console.log("surfaceAreaArr", surfaceAreaArr)

    let total = surfaceAreaArr.reduce((currentTotal, number) => {
        return currentTotal + number;
    }, 0)

    console.log("total:", total)
    total += surfaceAreaArr[0] / 2;
    console.log("total2:", total)
    presentCalcArray.push(total)
}

const answer = presentCalcArray.reduce((currentTotal, number) => currentTotal + number, 0)

console.log("final answer:", answer)

