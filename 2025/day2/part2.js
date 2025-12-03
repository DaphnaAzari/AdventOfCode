const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const lines = input.trim().split(",")

let invalidIdCount = 0

for (const line of lines) {
    //cleaner get of dirst and second id:
    const [firstIdStr, secondIdStr] = line.split("-")
    //convert strings to numbers:
    const firstId = parseInt(firstIdStr)
    const secondId = parseInt(secondIdStr)

    //look at every number in this range:
    for (let i = firstId; i <= secondId; i++) {
        //convert current num to string:
        const numStr = String(i);
        //assume the number is valid at first
        //if repeated: change to true:
        let isInvalid = false;


        //loop to try every possible sequence 
        //length from 1 up to half the number’s length as the numb has
        //to repeat a min of twice (so has to be a min of 1 at start) 
        //(sequence longer than half cannot repeat twice)
        //if seqLength was zero numStr.slice(0, 0) would be an empty string,
        //and you can't repeate nothing! 
        //Math.floor(numStr.length / 2)in order for a sequence to repeat at least twice,
        //must fit the number at least twice
        for (let seqLength = 1; seqLength <= Math.floor(numStr.length / 2); seqLength++) {
            // get the first sequence
            const seq = numStr.slice(0, seqLength)
            // repeat the sequence enough times to cover the entire number

            //Math.floor(numStr.length / seqLength): 
            //calculates how many times it fits completely
            //(numStr.length is how many digits the whole number has)
            //seqLength is the length of the sequence
            const repeated = seq.repeat(Math.floor(numStr.length / seqLength))
            // check if repeated sequence exists inside the number
            //checks if the repeated sequence contains the full number-
            //if yes: invalid
            if (repeated.includes(numStr)) {
                isInvalid = true
                break
            }
        }

        if (isInvalid) {
            invalidIdCount += i
        }
    }
}

console.log("invalidIdCount:", invalidIdCount)