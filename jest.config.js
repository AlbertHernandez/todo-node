module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverageFrom: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
    '!**/node_modules/**',
  ],
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
