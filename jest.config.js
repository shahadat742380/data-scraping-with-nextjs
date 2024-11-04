module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!@t3-oss/env-nextjs|other-esm-package)/', // Add exceptions for ES modules
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
        useESM: true, // Tell ts-jest to use ES Modules
      },
    },
  };
  