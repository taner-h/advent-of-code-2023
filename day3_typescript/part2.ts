import * as fs from "fs";

const input = fs.readFileSync("./input1.txt").toString();

console.log(new Set(input.match(/\D/g)));

type EngineNumber = {
  value: number;
  row: number;
  columns: number[];
};

type EngineSymbol = {
  value: string;
  row: number;
  column: number;
};

function range(start: number, size: number): Array<number> {
  return [...Array(size).keys()].map((i) => i + start);
}

function getNumbers(
  numbersOfLine: IterableIterator<RegExpMatchArray>,
  index: number
) {
  for (const number of numbersOfLine) {
    if (number.index === null || number.index === undefined) continue;
    numbers.push({
      value: parseInt(number[0]),
      row: index,
      columns: range(number.index, number[0].length),
    });
  }
}

function getSymbols(
  symbolsOfLine: IterableIterator<RegExpMatchArray>,
  index: number
) {
  for (const symbol of symbolsOfLine) {
    if (symbol.index === null || symbol.index === undefined) continue;

    symbols.push({
      value: symbol[0],
      row: index,
      column: symbol.index,
    });
  }
}

function findNumbersAndSymbols(lines: string[]): void {
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const numberRegex = /(\d+)/g;
    const numbersOfLine = line.matchAll(numberRegex);

    getNumbers(numbersOfLine, index);

    const symbolRegex = /[$&+,:;=?@#/|'<>\-^*()%!]/g;
    const symbolsOfLine = line.matchAll(symbolRegex);
    getSymbols(symbolsOfLine, index);
  }
}

function hasCollision(array1: number[], array2: number[]) {
  return array1.some((item) => array2.includes(item));
}

const lines = input.split("\n");
const LENGTH = lines[0].length;

const numbers: EngineNumber[] = [];
const symbols: EngineSymbol[] = [];

findNumbersAndSymbols(lines);

console.log(numbers);
console.log(symbols);

const partNumbers: EngineNumber[] = [];

let total = 0;

symbols.forEach((symbol) => {
  const partNumbersOfSymbol: EngineNumber[] = [];
  if (symbol.row - 1 >= 0) {
    partNumbersOfSymbol.push(
      ...numbers.filter(
        (number) =>
          number.row === symbol.row - 1 &&
          hasCollision(
            [symbol.column - 1, symbol.column, symbol.column + 1],
            number.columns
          )
      )
    );
  }

  partNumbersOfSymbol.push(
    ...numbers.filter(
      (number) =>
        number.row === symbol.row &&
        hasCollision(
          [symbol.column - 1, symbol.column, symbol.column + 1],
          number.columns
        )
    )
  );

  if (symbol.row + 1 < 140) {
    partNumbersOfSymbol.push(
      ...numbers.filter(
        (number) =>
          number.row === symbol.row + 1 &&
          hasCollision(
            [symbol.column - 1, symbol.column, symbol.column + 1],
            number.columns
          )
      )
    );
  }

  console.log(symbol);
  console.log(partNumbersOfSymbol);
  const uniquePartNumbersOfSymbol = new Set(partNumbersOfSymbol);

  if (uniquePartNumbersOfSymbol.size === 2) {
    const valuesOfSet = [...uniquePartNumbersOfSymbol];
    const gearRatio: number = valuesOfSet[0].value * valuesOfSet[1].value;
    console.log(uniquePartNumbersOfSymbol, gearRatio);
    total += gearRatio;
  }
});

console.log(total);
