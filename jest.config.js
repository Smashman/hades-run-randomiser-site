module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    ".+\\.(png)$": "identity-obj-proxy"
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/data.ts',
    '!src/main.ts',
    '!src/scss/**',
    '!src/img/**',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['151001']
      }
    }
  }
};