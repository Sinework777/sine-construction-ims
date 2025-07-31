module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.env.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^src/config/firebase$': '<rootDir>/src/config/firebase.jest.js',
    '^src/config/firebase.js$': '<rootDir>/src/config/firebase.jest.js',
    '^.+/config/firebase(\\.js)?$': '<rootDir>/src/config/firebase.jest.js',
    '^src/firebase/firebase$': '<rootDir>/src/config/firebase.jest.js',
    '^src/firebase/firebase.js$': '<rootDir>/src/config/firebase.jest.js',
    '^.+/firebase/firebase(\\.js)?$': '<rootDir>/src/config/firebase.jest.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/index.js',
    '!src/**/index.jsx',
    '!src/**/main.jsx',
    '!src/**/serviceWorker.js',
    '!src/**/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
