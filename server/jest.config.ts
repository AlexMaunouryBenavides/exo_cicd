import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          moduleResolution: "node",
          verbatimModuleSyntax: false,
          ignoreDeprecations: "6.0",
        },
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  verbose: true,
};

export default config;
