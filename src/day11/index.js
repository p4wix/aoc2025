import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = Object.fromEntries(parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(": ").map((x, i) => i == 0 ? x : x.split(" "))))

  let count = 0;

  function parseDevices(device) {
    const entries = input[device];
    if (entries.length > 1) count += entries.length - (device == "you" ? 0 : 1);
    for (const entry of entries) {
      if (entry != "out") parseDevices(entry);
    }
  }

  parseDevices("you");


  return count;
};

const part2 = (rawInput) => {
  const input = Object.fromEntries(parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0)
    .map(x => x.split(": ").map((x, i) => i == 0 ? x : x.split(" "))));

  const outputs = {};

  function parseDevices(device, dac, fft) {
    const outputKey = `${device}_${dac}_${fft}`;
    if (outputs.hasOwnProperty(outputKey)) return outputs[outputKey];

    let count = 0;
    for (const entry of input[device]) {
      if (entry != "out") count += parseDevices(entry, dac || entry == "dac", fft || entry == "fft");
      else if (dac && fft) count++;
    }
    outputs[outputKey] = count;
    return count;
  }


  return parseDevices("svr", false, false);
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
