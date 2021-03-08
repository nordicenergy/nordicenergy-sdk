const baseConfig = require('./jest.src.config');
module.exports = {
    ...baseConfig,
    moduleNameMapper: {
        '^@nordicenergy-js/(.*)$': '<rootDir>/packages/nordicenergy-$1/src/index.ts',
    },
    setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
    testMatch: ['<rootDir>/e2e/src/?(*.)+(spec|test|e2e).ts'],
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10,
        },
    },
    collectCoverageFrom: [
        // 'packages/!(nordicenergy-core)/src/**/*.ts',
        'packages/nordicenergy-core/src/**/*.ts',
        'packages/nordicenergy-utils/src/**/*.ts',
        'packages/nordicenergy-crypto/src/**/*.ts',
        'packages/nordicenergy-transaction/src/**/*.ts',
    ],
};