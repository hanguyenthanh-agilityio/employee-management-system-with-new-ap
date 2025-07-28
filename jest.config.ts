import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/fonts/',
    '/src/icons/',
    '/src/themes/',
    '/src/types/',
    '/src/constants/',
    '/src/app/layout.tsx',
    '/src/app/loading.tsx',
    '/src/app/not-found.tsx',
    '/src/app/error.tsx',
    '/src/app/page.tsx',
    '/src/mocks',
    '/src/middleware.ts',
    '/src/app/\\(dashboard\\)/company',
    '/src/app/\\(dashboard\\)/extras/page.tsx',
    '/src/app/\\(dashboard\\)/payroll/page.tsx',
    '/src/app/\\(dashboard\\)/requests/page.tsx',
    '/src/app/\\(dashboard\\)/dashboard/update-profile/layout.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
