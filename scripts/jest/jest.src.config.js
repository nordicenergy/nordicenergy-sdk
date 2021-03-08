const config = {
    transform: {
        // '^.+\\.(t|j)s$': require.resolve('./transformer.js')
        '^.+\\.(t)s$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            babelConfig: true,
            tsConfig: './tsconfig.test.json',
        },
    },
    testMatch: [
        // '<rootDir>/packages/**/test/?(*.)+(spec|test).js',
        '<rootDir>/packages/nordicenergy-core/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-account/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-network/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-crypto/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-contract/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-transaction/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-staking/test/?(*.)+(spec|test).ts',
        '<rootDir>/packages/nordicenergy-utils/test/?(*.)+(spec|test).ts',
    ],
    moduleDirectories: ['src', 'node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        'cross-fetch': 'jest-fetch-mock',
    },
    testURL: 'http://localhost',
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10,
        },
    },
    rootDir: process.cwd(),
    roots: ['<rootDir>/packages', '<rootDir>/scripts', '<rootDir>/e2e'],
    collectCoverageFrom: [
        // 'packages/!(nordicenergy-core)/src/**/*.ts',
        'packages/nordicenergy-core/src/**/*.ts',
        'packages/nordicenergy-utils/src/**/*.ts',
        'packages/nordicenergy-crypto/src/**/*.ts',
        'packages/nordicenergy-transaction/src/**/*.ts',
        'packages/nordicenergy-staking/src/**/*.ts',
        'packages/nordicenergy-contract/src/**/*.ts',
    ],
    // timers: 'fake',
    setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
    setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
    testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
    collectCoverage: true,
    automock: false,
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = config;