# Repos Explorer

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3-yellowgreen?logo=vitest)](https://vitest.dev/)

Repos Explorer is a modern web application for searching, discovering, and viewing details about GitHub repositories. It is built with a focus on performance, scalability, and a clean user experience, featuring a custom component library, robust state management, and efficient data fetching patterns.

**[➡️ View Live Demo](https://armandocin.github.io/repos-explorer/)**


## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [Yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/armandocin/repos-explorer.git
    ```

2.  **Navigate to the project directory:**

    ```sh
    cd repos-explorer
    ```

3.  **Install dependencies:**

    Using Yarn (recommended, based on the `yarn.lock` file):
    ```sh
    yarn install
    ```
    Alternatively, using npm:
    ```sh
    npm install
    ```

4.  **Set up environment variables:**

    Create a file named `.env` in the root of the project. This file is required for the application to connect to the GitHub API. Add the following content to it:

    ```env
    VITE_GITHUB_API_BASE_URL=https://api.github.com
    ```

5.  **Run the development server:**

    Using Yarn:
    ```sh
    yarn dev
    ```
    Or using npm:
    ```sh
    npm run dev
    ```

The application will be running and accessible at `http://localhost:5173` (or the next available port printed in your console).

## 🚢 Deployment

This project is deployed on **GitHub Pages**.

### Local Deployment

In alternative, you can run the build locally: 

1.  **Run locally the build script**:
    ```sh
    yarn build:local
    ```

2.  **Serve the build locally**:
    ```sh
    yarn preview:local
    ```

## ✨ Features

*   **Repository Search**: Fast and intuitive search for any public repository on GitHub.
*   **Detailed View**: In-depth details for each repository, including stats (stars, forks, watchers), language, license, and more.
*   **Top Contributors**: View the top contributors for each repository.
*   **Pagination**: Efficiently navigate through large sets of search results.
*   **Responsive Design**: A fully responsive interface that works on all screen sizes, from mobile to desktop.
*   **Light & Dark Mode**: Seamless theme switching that respects system preferences and allows manual override.
*   **Loading Skeletons**: Smooth user experience with skeleton loaders while data is being fetched.
*   **URL-based State**: Search query and page number are stored in the URL, allowing for shareable and bookmarkable links.

## 🛠️ Tech Stack & Key Libraries

*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Styling**:
    *   Plain CSS with CSS Variables for theming.
    *   Modular, component-scoped styles.
    *   Custom `@styleguide` component library.
*   **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
*   **Linting**: [ESLint](https://eslint.org/) with TypeScript support.
*   **SVG Handling**: [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) for importing SVGs as React components.

## 📂 Project Structure

The project follows a feature-based structure that promotes separation of concerns, scalability, and maintainability.

```
src
├── @styleguide/       # Custom, reusable component library and styles
│   ├── components/    # Dumb UI components (Button, Avatar, Input, etc.)
│   └── styles/        # Global styles, CSS variables, and typography
├── api/               # API layer for fetching data
│   ├── endpoints/     # Files for specific API resources (repos, search)
│   └── utils.ts       # Generic apiWrapper and error handling
├── assets/            # Static assets like SVGs
├── components/        # "Smart" components, composed of styleguide components
│   ├── common/        # Components shared across features (Header, Footer, Layout)
│   └── repositories/  # Components specific to the repositories feature
├── config/            # Application configuration (e.g., API URLs, page size)
├── contexts/          # React Context providers (e.g., ThemeProvider)
├── hooks/             # Custom React hooks
│   ├── common/        # General-purpose hooks (useGoBack, usePagination)
│   └── repositories/  # Hooks specific to the repositories feature (useSearchRepositories)
├── pages/             # Top-level route components
├── router/            # React Router configuration and data loaders
├── stores/            # Redux Toolkit state management
│   ├── actions/       # Async thunks for side effects
│   ├── slices/        # Redux slices with reducers and state logic
│   └── store.ts       # Redux store configuration
├── types/             # TypeScript type definitions
└── utils/             # General utility functions (e.g., keysToCamel)
```

## 🏗️ Architecture & Design Decisions

*   **Component-Driven Development**: The application is built around a custom `@styleguide` library of presentational components. This enforces a consistent design, promotes reusability, and separates UI from business logic.
*   **State Management with Redux Toolkit**:
    *   **Entity Adapter**: The `repositories` slice uses `@reduxjs/toolkit`'s `createEntityAdapter` to store repository data in a normalized shape. This provides memoized selectors and efficient CRUD operations, preventing data duplication.
    *   **Async Thunks**: All API interactions are handled by async thunks, which cleanly separates asynchronous logic from components and standardizes how loading and error states are managed.
*   **Efficient Data Fetching with React Router Loaders**: The repository detail page uses a **React Router `loader` function**. This starts the data fetch *in parallel* with the component rendering, eliminating request waterfalls and improving perceived performance. The component uses `Suspense` to show a skeleton loader while the data is being resolved.
*   **Scalable Styling**: Styling is managed via plain CSS, organized by component. A global system of **CSS variables** is used for theming (light/dark mode), colors, and typography, making it easy to maintain and extend the visual design.
*   **Custom Hooks for Logic Re-use**: Complex logic, such as search state management (`useSearchRepositories`) and pagination calculation (`usePagination`), is encapsulated in custom hooks. This keeps components clean and logic testable and reusable.

## 📜 Available Scripts

In the project directory, you can run:

| Script                | Description                                                              |
|-----------------------|--------------------------------------------------------------------------|
| `yarn dev`            | Runs the app in development mode with hot-reloading.                     |
| `yarn build`          | Builds the app for production to the `dist` folder.                      |
| `yarn build:local`    | Builds the app for a local deployment.                                   |
| `yarn lint`           | Lints the codebase using ESLint.                                         |
| `yarn preview`        | Serves the production build locally to preview it.                       |
| `yarn preview:local`  | Serves the local production build to preview it.                  |
| `yarn test`           | Runs the test suite using Vitest.                                        |
| `yarn build:gh-pages` | Builds the app for GitHub Pages and creates a `404.html` for SPA routing. |

## 🧪 Testing

The project is configured with [Vitest](https://vitest.dev/) for unit and integration testing. Tests are located alongside the files they test (e.g., `usePagination.test.ts`). To run the tests, use the `yarn test` command.

---

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```