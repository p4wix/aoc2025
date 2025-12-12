import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(/ +/g).filter(x => x.length > 0));

  const end = input.length - 1;
  let output = 0;
  for (let i = 0; i < input[0].length; i++) {
    const operation = input[end][i];
    if (operation === "+") {
      let result = 0;
      for (let j = 0; j < end; j++) {
        result += parseInt(input[j][i]);
      }
      output += result;
    }
    else if (operation === "*") {
      let result = 1;
      for (let j = 0; j < end; j++) {
        result *= parseInt(input[j][i]);
      }
      output += result;
    }
  }

  return output;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

  const chars = [];
  const end = input.length - 1;
  const last = input[end];
  for (let i = 0; i < last.length - 1;) {
    let index = last.slice(i + 1).split("").findIndex(x => x != " ");
    if (index < 0) index = last.length - i;
    chars.push(index);
    i += index + 1;
  }

  let output = 0;
  for (let i = chars.length - 1, j = last.length - 1; i >= 0; j -= chars[i] + 1, i--) {
    const endChar = j - chars[i];
    const operation = last[endChar + 1];
    if (operation == "+") {
      let result = 0;
      for (let k = j; k > endChar; k--) {
        let num = "";
        for (let l = 0; l < end; l++) {
          num += input[l][k];
        }
        result += parseInt(num.trim());
      }
      output += result;
    }
    else if (operation == "*") {
      let result = 1;
      for (let k = j; k > endChar; k--) {
        let num = "";
        for (let l = 0; l < end; l++) {
          num += input[l][k];
        }
        result *= parseInt(num.trim());
      }
      output += result;
    }
  }

  return output;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
