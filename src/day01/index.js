import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).replace(/\r/g, "").split("\n");
  let rotation = 50;
  let count = 0;
  for (const line of input) {
    const factor = parseInt(line.slice(1));
    if (line.startsWith("L")) rotation -= factor;
    else if (line.startsWith("R")) rotation += factor;
    rotation = ((rotation % 100) + 100) % 100;
    if (rotation === 0) count++;
  }

  console.log(count);
  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).replace(/\r/g, "").split("\n");
  let rotation = 50;
  let count = 0;
  for (const line of input) {
    const factor = parseInt(line.slice(1));
    if (line.startsWith("L")) {
      for (let i = 0; i < factor; i++) {
        rotation = (((rotation - 1) % 100) + 100) % 100;
        if (rotation === 0) count++;
      }
    }
    else if (line.startsWith("R")) {
      for (let i = 0; i < factor; i++) {
        rotation = (((rotation + 1) % 100) + 100) % 100;
        if (rotation === 0) count++;
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
