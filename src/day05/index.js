import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0)
    .map(x => x.split("\n"));
  const ranges = input[0].map(x => x.split("-").map(x => parseInt(x)));
  const ingredients = input[1].map(x => parseInt(x));

  let fresh = 0;
  for (const ingredient of ingredients) {
    for (const range of ranges) {
      if (ingredient >= range[0] && ingredient <= range[1]) {
        fresh++;
        break;
      }
    }
  }

  return fresh;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0)
    .map(x => x.split("\n"));
  const ranges = input[0].map(x => x.split("-").map(x => parseInt(x)));

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    for (let j = 0; j < i; j++) {
      const minimum = ranges[j];
      if (minimum.length === 0) continue;
      const value = minimum[1] + 1;
      if (range[0] >= minimum[0] && range[0] <= minimum[1] && range[1] >= value) range[0] = value;
    }
    for (let j = 0; j < i; j++) {
      const maximum = ranges[j];
      if (maximum.length === 0) continue;
      const value = maximum[0] - 1;
      if (range[1] >= maximum[0] && range[1] <= maximum[1] && range[0] <= value) range[1] = value;
    }
    for (let j = 0; j < ranges.length; j++) {
      if (j === i) continue;
      const child = ranges[j];
      if (child.length === 0) continue;
      if (range[0] <= child[0] && range[1] >= child[1]) child.splice(0, child.length);
      else if (range[0] >= child[0] && range[1] <= child[1]) {
        range.splice(0, range.length);
        break;
      }
    }
  }

  let fresh = 0;
  for (const range of ranges) {
    if (range.length === 0) continue;
    fresh += range[1] - range[0] + 1;
  }

  return fresh;
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
