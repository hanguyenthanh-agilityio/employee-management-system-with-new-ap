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
    '/src/app/fonts.ts',
    '/src/app/global-error.tsx',
    '/src/mocks',
    '/src/middleware.ts',
    '/src/app/\\(dashboard\\)/company',
    '/src/app/\\(dashboard\\)/extras/page.tsx',
    '/src/app/\\(dashboard\\)/payroll/page.tsx',
    '/src/app/\\(dashboard\\)/requests/page.tsx',
    '/src/app/\\(dashboard\\)/dashboard/update-profile/layout.tsx',
    '/src/app/\\(dashboard\\)/dashboard/page.tsx',
    '/src/app/\\(dashboard\\)/layout.tsx',
    '/src/app/\\(dashboard\\)/loading.tsx',
    '/src/app/\\(dashboard\\)/not-found.tsx',
    '/src/app/\\(dashboard\\)/error.tsx',
    '/src/app/\\(auth\\)/login/layout.tsx',
    '/src/app/\\(auth\\)/register/layout.tsx',
    '/src/app/\\(auth\\)/error.tsx',
    '/src/app/\\(auth\\)/loading.tsx',
    '/src/app/\\(auth\\)/not-found.tsx',
    '/src/components/theme/theme-provider.tsx',
    '/src/utils/schemas',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
