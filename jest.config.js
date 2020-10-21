module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['151001']
      }
    }
  }
};