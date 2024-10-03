module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/infra/db/migrations/**',
    '!<rootDir>/src/domain/models/entities/**',
    '!<rootDir>/src/infra/db/helpers/**',
    '!<rootDir>/src/**/*index.ts',
    '!**/protocols/**',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  testTimeout: 30000,
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.js']

}
