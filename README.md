# Employee Management System (NEXT.JS - PRACTICE)

## Author

- Ha Nguyen

## Overview

- This document provides a detailed estimate of the Next.js Basic practice.

## Timeline

- days
- Start day:
- End day:

## Team size

- 1 Dev

## Technical stack

- [Next.js](https://nextjs.org/learn/dashboard-app) App Router

  - The App Router is a file-system based router that uses React's latest features such as Server Components, Suspense, and Server Functions.

- React latest version (v19)

  - React is declarative, efficient, and flexible Javascript library for building user interfaces. It let you compose complex UIs from small and isolated pieces of code called "component".

- [Tailwind UI](https://tailwindui.com/) (v3.4.1)

  - Tailwind CSS is a utility-first CSS framework that provides pre-designed classes to build responsive web designs.

- [Swagger](https://human-resource.up.railway.app/swagger/)

- [Strapi](https://strapi.io/)

- [Storybook](https://storybook.js.org/) (v8.1.2)

  - Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

- [TypeScript](https://www.typescriptlang.org/) (4.9.5)

  - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- Vercel

  - Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.

- Developer tools:

  - [Eslint](https://eslint.org/docs/latest/user-guide/getting-started) (v8.34.0)

    - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

  - [Prettier](https://prettier.io/) (v2.8.4)

    - An opinionated code formatter
    - Supports many languages
    - Integrates with most editors
    - Has few options

  - [Husky](https://www.npmjs.com/package/husky) (v8.0.0)

    - Husky is a tool that allows us to easily wrangle Git hooks and run the scripts we want at those stages.
    - Husky improves your commits and more

  - [Lint-staged](https://www.npmjs.com/package/lint-staged) (v13.1.2)

    - Lint-staged is a tool that prevents bad code from leaving a developer's computer. It allows us to run commands on staged files when a developer runs git commit . If any of the commands fail then the commit also fails—preventing bad commits from being pushed to GitHub.

## Development environment

- Visual Studio Code (text editor)

## Target

- Analysis design
- Build Next.js app
- Build React app with the latest version (v19+)
- Practice with next.js
  - Streaming + Data Fetching
  - Caching
  - App Router
  - Server/client rendering
- Apply Storybook
- Deploy with vercel

## Design

- Implement UI with: [Design](https://www.figma.com/proto/Dd7pkxd0HvurA1JwGkaIQZ/HRMS-Human-Resource-management-system---Employee-mnagement-System-?node-id=483-54&p=f&t=B8Vhv0Ym3V0MODuq-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## Installation

| Command                                                                    | Action                                                           |
| :------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `git clone git@gitlab.asoft-python.com:ha.nguyenthanh/nextjs-training.git` | Create a copy of the target repository                           |
| `cd employee-management-system-with-new-api`                               | Change directory to Employee Management System                   |
| `pnpm install`                                                             | Installs dependencies                                            |
| `pnpm run dev`                                                             | Start local dev server at localhost:3000                         |
| `pnpm lint`                                                                | Check warning & error following ESLint                           |
| `pnpm storybook`                                                           | Run the storybook to review all the components at localhost:6006 |
