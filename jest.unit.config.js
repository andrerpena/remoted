// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: "coverage",
  // An array of file extensions your modules use
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testMatch: ["**/*.test.+(ts|tsx|js)"],
  testPathIgnorePatterns: ["__ci_tests__"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
