import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).replace(/\r/g, "")
    .split("\n")[0]
    .split(",")
    .map(x => {
      const parts = x.split("-");
      const minimum = parseInt(parts[0]);
      const maximum = parseInt(parts[1]);
      return Array(maximum - minimum + 1).fill(0).map((_, i) => i + minimum);
    })
    .flat();

  let count = 0;
  for (const num of input) {
    const str = num.toString();
    if (str.length % 2 === 0 && str.slice(0, str.length / 2) === str.slice(str.length / 2)) count += num;
  }

  console.log(count);

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).replace(/\r/g, "")
    .split("\n")[0]
    .split(",")
    .map(x => {
      const parts = x.split("-");
      const minimum = parseInt(parts[0]);
      const maximum = parseInt(parts[1]);
      return Array(maximum - minimum + 1).fill(0).map((_, i) => i + minimum);
    })
    .flat();

  let count = 0;
  for (const num of input) {
    const str = num.toString();
    for (let i = 1; i <= str.length / 2; i++) {
      if (str.length % i === 0) {
        let j = i;
        for (; j < str.length; j += i) {
          if (str.slice(j - i, j) !== str.slice(j, j + i)) break;
        }
        if (j >= str.length) {
          count += num;
          break;
        }
      }
    }
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
