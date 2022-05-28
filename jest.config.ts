import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: { "^.+\\.(t|j)sx?$": "ts-jest" },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  resetMocks: true,
  coveragePathIgnorePatterns: [
    "<rootDir>/src/models",
    "<rootDir>/src/providers"
  ]
};

export default config;