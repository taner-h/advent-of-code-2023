const fs = require("fs");

const input = fs.readFileSync("./input1.txt").toString();

// const input = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;

const lines = input.split("\n");

let sum = 0;

function getFirstDigit(str) {
  for (const char of str) {
    const value = parseInt(char);
    if (value) return value;
  }
}

function getLastDigit(str) {
  for (let index = str.length; index > -1; index--) {
    const char = str[index];
    const value = parseInt(char);
    if (value) return value;
  }
}

lines.forEach((line) => {
  const first = getFirstDigit(line);
  const last = getLastDigit(line);
  const calibrationValue = 10 * first + last;
  sum += calibrationValue;

  console.log(line);
  console.log("first", first);
  console.log("last", last);
  console.log("cal", calibrationValue, "\n");
});

console.log(sum);
