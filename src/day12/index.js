import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n\n")
    .filter(x => x.length > 0);
  const regions = input.pop().split("\n").filter(x => x.length > 0).map(x => {
    const [size, counts] = x.split(": ");
    const [width, height] = size.split("x").map(x => parseInt(x));
    return { counts: counts.split(" ").map(x => parseInt(x)), width, height }
  });
  const presents = input.map(x => x.split("\n").slice(1).join(""));

  let result = 0;
  for (const { counts, width, height } of regions) {
    let size = 0;
    for (let i = 0; i < presents.length; i++) {
      size += (presents[i].split("#").length - 1) * counts[i];
    }
    if (width * height >= size) result++;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
