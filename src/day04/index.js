import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

  let count = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    const top = y > 0 ? input[y - 1] : [];
    const bottom = y < input.length - 1 ? input[y + 1] : [];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "@") {
        let rolls = 0;
        const left = x - 1;
        const right = x + 1;
        if (top[left] === "@") rolls++;
        if (top[x] === "@") rolls++;
        if (top[right] === "@") rolls++;
        if (row[left] === "@") rolls++;
        if (row[right] === "@") rolls++;
        if (bottom[left] === "@") rolls++;
        if (bottom[x] === "@") rolls++;
        if (bottom[right] === "@") rolls++;
        if (rolls < 4) count++;
      }
    }
  }

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(""));

  let count = 0;
  while (true) {
    const removed = [];
    for (let y = 0; y < input.length; y++) {
      const row = input[y];
      const top = y > 0 ? input[y - 1] : [];
      const bottom = y < input.length - 1 ? input[y + 1] : [];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === "@") {
          let rolls = 0;
          const left = x - 1;
          const right = x + 1;
          if (top[left] === "@") rolls++;
          if (top[x] === "@") rolls++;
          if (top[right] === "@") rolls++;
          if (row[left] === "@") rolls++;
          if (row[right] === "@") rolls++;
          if (bottom[left] === "@") rolls++;
          if (bottom[x] === "@") rolls++;
          if (bottom[right] === "@") rolls++;
          if (rolls < 4) removed.push([x, y]);
        }
      }
    }
    for (const coordinate of removed) {
      input[coordinate[1]][coordinate[0]] = ".";
    }
    count += removed.length;
    if (removed.length === 0) break;
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
