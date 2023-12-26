const fs = require("fs");
const input = fs.readFileSync("./input2.txt").toString();

// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

const textToDigit = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const texts = [...textToDigit.keys()];

const lines = input.split("\n");

let sum = 0;

function getFirstDigitAndIndex(str) {
  for (let index = 0; index < str.length; index++) {
    const char = str[index];
    const value = parseInt(char);
    if (value) return [value, index];
  }
  return null;
}

function getLastDigitAndIndex(str) {
  for (let index = str.length; index > -1; index--) {
    const char = str[index];
    const value = parseInt(char);
    if (value) return [value, index];
  }
  return null;
}

function getNumberDigits(line) {
  const indexDigit = new Map();
  const first = getFirstDigitAndIndex(line);
  const last = getLastDigitAndIndex(line);

  if (!first || !last) {
    return new Map();
  }
  indexDigit.set(first[1], first[0]);
  indexDigit.set(last[1], last[0]);
  return indexDigit;
}

function getTextDigits(line) {
  const indexDigit = new Map();
  texts.forEach((text) => {
    const index = line.indexOf(text);
    const lastIndex = line.lastIndexOf(text);
    if (index > -1) indexDigit.set(index, textToDigit.get(text));
    if (lastIndex > -1) indexDigit.set(lastIndex, textToDigit.get(text));
  });
  return indexDigit;
}

function getFirstAndLastDigit(line) {
  const numberDigits = getNumberDigits(line);
  const textDigits = getTextDigits(line);

  const digits = new Map([...numberDigits, ...textDigits]);
  const index = [...digits.keys()];

  const minIndex = Math.min(...index);
  const maxIndex = Math.max(...index);

  const firstDigit = digits.get(minIndex);
  const lastDigit = digits.get(maxIndex);

  return [firstDigit, lastDigit];
}

lines.forEach((line) => {
  const firstAndLast = getFirstAndLastDigit(line);
  const calibrationValue = 10 * firstAndLast[0] + firstAndLast[1];
  sum += calibrationValue;

  console.log(line);
  console.log("first", firstAndLast[0]);
  console.log("last", firstAndLast[1]);
  console.log("cal", calibrationValue, "\n");
});

console.log(sum);
