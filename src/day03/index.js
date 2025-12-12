import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).replace(/\r/g, "")
    .split("\n");

  let count = 0;
  for (const line of input) {
    let max1 = 0;
    let max2 = 0;
    for (let i = 0; i < line.length; i++) {
      const joltage = parseInt(line[i]);
      if (joltage > max1 && i !== line.length - 1) {
        max1 = joltage;
        max2 = 0;
      }
      else if (joltage > max2) max2 = joltage;
    }
    count += max1 * 10 + max2;
  }

  console.log(count);

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n");

  let count = 0;
  for (const line of input) {
    let maxes = Array(12).fill(0);
    for (let i = 0; i < line.length; i++) {
      const joltage = parseInt(line[i]);
      for (let j = 0; j < maxes.length; j++) {
        if (joltage > maxes[j] && i < line.length - maxes.length + j + 1) {
          maxes[j] = joltage;
          for (let k = j + 1; k < maxes.length; k++) {
            maxes[k] = 0;
          }
          break;
        }
      }
    }
    count += maxes.reduce((a, x, i, r) => a + x * (10 ** (r.length - i - 1)), 0);
  }

  return count;
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
