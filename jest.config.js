module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx,mjs}',
    '!<rootDir>/node_modules/'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: [
    'index.ts$',
    'constants',
    'types.ts',
    'typeDefinitions',
    '__generated__'
  ],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|png|jpg)$': 'identity-obj-proxy'
  },
  reporters: ['default', 'jest-sonar'],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": ["ts-jest"],
    "^.+\\.svg$": "<rootDir>/mocks/svg-transform.js"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/mocks/setup-tests.js'],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
};
