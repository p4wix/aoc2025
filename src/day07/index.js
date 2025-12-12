import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

  let split = 0;
  function beginBeam(x, startY) {
    for (let y = startY; y < input.length; y++) {
      const cell = input[y][x];
      if (cell === "|") return;
      else if (cell === "^") {
        split++;
        beginBeam(x - 1, y);
        beginBeam(x + 1, y);
        break;
      }
      else {
        input[y][x] = "|";
      }
    }
  }

  startLoop:
    for (let y = 0; y < input.length; y++) {
      const row = input[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "S") {
          beginBeam(x, y);
          break startLoop;
        }
      }
    }

  return split;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));
  const outputs = {};

  let split = 0;
  function beginBeam(x, startY) {
    const key = `${x},${startY}`;
    let output = 0;
    if (typeof outputs[key] != "undefined") {
      output = outputs[key];
    }
    else {
      for (let y = startY; y < input.length; y++) {
        if (input[y][x] === "^") {
          output += beginBeam(x - 1, y);
          output += beginBeam(x + 1, y);
          break;
        }
      }
      if (output === 0) output = 1;
      outputs[key] = output;
    }
    return output;
  }

  startLoop:
    for (let y = 0; y < input.length; y++) {
      const row = input[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "S") {
          split = beginBeam(x, y);
          break startLoop;
        }
      }
    }


  return split;
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
