const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '\\\\node_modules\\\\',
        '\\.pnp\\.[^\\\\]+$',
    ],
});

module.exports = createJestConfig();
