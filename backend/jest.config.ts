import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  preset: "ts-jest/presets/default-esm", // or other ESM presets
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
