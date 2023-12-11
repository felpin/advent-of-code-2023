import path from "node:path";

import { readFileLineByLine } from "../utils/read-file";

const DIGIT_REGEX = /\d/;

const getLineCalibrationValue = (line: string) => {
  const digits = [...line].filter((char) => DIGIT_REGEX.test(char));

  if (digits.length === 0) {
    throw new Error(`Line ${line} don't have any digits`);
  }

  return Number.parseInt(`${digits[0]}${digits[digits.length - 1]}`);
};

(async () => {
  let calibration = 0;

  await readFileLineByLine(path.join(__dirname, "input.txt"), (line) => {
    calibration += getLineCalibrationValue(line);
  });

  console.log(`Calibration: ${calibration}`);
})();
