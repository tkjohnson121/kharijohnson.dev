require('./env.js');

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'd.ts', 'json', 'node'],
  moduleDirectories: ['__tests__', 'node_modules'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: ['**/*.test.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [
    /** Dist Folder */
    '<rootDir>/.next/',
    '<rootDir>/out/',
    /** External Services */
    /** Deps */
    '<rootDir>/node_modules/',
  ],
  coveragePathIgnorePatterns: [
    /** Dist Folder */
    '<rootDir>/.next/',
    '<rootDir>/.now/',
    '<rootDir>/out/',
    /** External Services */
    /** Deps */
    '<rootDir>/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js',
  },
  setupFilesAfterEnv: ['<rootDir>/utils/setup-tests.tsx'],
};
