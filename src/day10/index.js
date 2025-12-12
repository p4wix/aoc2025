import run from "aocrunner";
import { init } from "z3-solver";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

  function parseButtons(requirement, buttons, lights, index, depth) {
    for (let i = index; i < buttons.length; i++) {
      const lights2 = lights.slice();
      for (const light of buttons[i]) {
        lights2[light] = !lights2[light];
      }
      if (lights2.every((x, j) => x == requirement[j])) return depth;
    }

    let minimum = 0;
    for (let i = index; i < buttons.length; i++) {
      const lights2 = lights.slice();
      for (const light of buttons[i]) {
        lights2[light] = !lights2[light];
      }
      const result = parseButtons(requirement, buttons, lights2, i + 1, depth + 1);
      if (minimum == 0 || (result > 0 && result < minimum)) minimum = result;
    }

    return minimum;
  }

  let result = 0;
  for (const line of input) {
    const parts = line.split(" ");
    const requirement = parts.shift().slice(1, -1).split("").map(x => x == "#");
    parts.pop();
    const buttons = parts.map(x => x.slice(1, -1).split(",").map(x => parseInt(x)));
    const lights = Array(requirement.length).fill(false);
    result += parseButtons(requirement, buttons, lights, 0, 1);
  }

  console.log();

  return result;
};

const part2 = async (rawInput) => {
  const input = parseInput(rawInput)
    .replace(/\r/g, "")
    .split("\n")
    .filter(x => x.length > 0);

  const { Context } = await init();
  let result = 0;

  for (const line of input) {
    const parts = line.split(" ");
    parts.shift();

    const requirement = parts
      .pop()
      .slice(1, -1)
      .split(",")
      .map(Number);

    const buttons = parts.map(x =>
      x.slice(1, -1).split(",").map(Number)
    );

    const { Int, Optimize } = Context("main");
    const solver = new Optimize();
    const variables = [];

    for (let i = 0; i < buttons.length; i++) {
      const v = Int.const(String.fromCharCode(97 + i));
      solver.add(v.ge(0));
      variables.push(v);
    }

    for (let i = 0; i < requirement.length; i++) {
      let expr = Int.val(0);
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j].includes(i)) {
          expr = expr.add(variables[j]);
        }
      }
      solver.add(expr.eq(Int.val(requirement[i])));
    }

    const sum = variables.reduce(
      (acc, v) => acc.add(v),
      Int.val(0)
    );

    solver.minimize(sum);

    if (await solver.check() === "sat") {
      result += parseInt(solver.model().eval(sum).toString(), 10);
    }
  }

  return result;
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
