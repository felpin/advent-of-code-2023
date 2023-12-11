import path from "node:path";

import { readFileLineByLine } from "../utils/read-file";

type LineMatch = {
  digit: number;
  index: number;
};

const CALIBRATION_MATCH_UTILS = [
  {
    callback: (value: string) => Number.parseInt(value),
    createRegex: () => /\d/dg,
  },
  {
    callback: () => 1,
    createRegex: () => /one/dg,
  },
  {
    callback: () => 2,
    createRegex: () => /two/dg,
  },
  {
    callback: () => 3,
    createRegex: () => /three/dg,
  },
  {
    callback: () => 4,
    createRegex: () => /four/dg,
  },
  {
    callback: () => 5,
    createRegex: () => /five/dg,
  },
  {
    callback: () => 6,
    createRegex: () => /six/dg,
  },
  {
    callback: () => 7,
    createRegex: () => /seven/dg,
  },
  {
    callback: () => 8,
    createRegex: () => /eight/dg,
  },
  {
    callback: () => 9,
    createRegex: () => /nine/dg,
  },
];

const getLineCalibrationValue = (line: string) => {
  const matches = CALIBRATION_MATCH_UTILS.reduce<LineMatch[]>(
    (matches, util) => {
      const regex = util.createRegex();

      let match = null;

      do {
        match = regex.exec(line);

        if (match !== null) {
          matches.push({
            digit: util.callback(match[0]),
            index: match.index,
          });
        }
      } while (match !== null);

      return matches;
    },
    [] as LineMatch[],
  );

  matches.sort((a, b) => a.index - b.index);

  return matches[0].digit * 10 + matches[matches.length - 1].digit;
};

(async () => {
  let calibration = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    calibration += getLineCalibrationValue(line);
  });

  console.log(`Calibration: ${calibration}`);
})();
