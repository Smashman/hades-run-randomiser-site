module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/data.ts',
    '!src/main.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['151001']
      }
    }
  }
};