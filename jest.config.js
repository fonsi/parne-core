const config = {
    verbose: true,
    roots: ['<rootDir>/src/'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules'],
    setupFiles: [
        '<rootDir>/tests/jestSetup.js',
    ],
};

module.exports = config;