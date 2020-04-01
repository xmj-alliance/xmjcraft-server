const config = {
  // rootDir: ".",
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json"
    }
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testMatch: [
    '**/*.test.ts'
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}

module.exports = config;
