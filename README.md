# 📝 GitHub App Homework

### Tech Stack

- React 18+ (SPA app)
- TypeScript
- State management (remote or local - Context / Zustand / Jotai / Redux / Tanstack Query / RTK Query, etc.)
- Any styling solution (CSS-in-js, css-modules, scss, etc…)
- Any component library (shadcn, MUI, radix-ui, Mantine, Chakra UI, etc…)

---

### Deliverable

You are tasked with building a React application that allows users to search for GitHub repositories by keyword using the [GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28). The application should display a list of matching repositories with basic information, support pagination, and allow users to view detailed information about any selected repository. Focus on clean code, good API handling, and user experience.

Keep the commit history clean and linear, using your preferred branching technique for merging different features.

_You are encouraged to use Gen AI tools to build your solution, it's important you understand the strengths and potential weaknesses of the logic you implement._

Remember to create a README.md file with the steps to deploy the application locally.

---

### Feature Sets

**Feature Set 1: Search & Display Repositories**

- Implement a search input field for users to enter keywords.
- Fetch repositories from GitHub's Search API based on the input.
- Display a list of repositories showing the name, owner, stars, and description.
- Handle loading and error states during the fetch process.

**Feature Set 2: Pagination**

- Add pagination controls to navigate through multiple pages of results.
- Support either numbered pages or a "Load More" button.
- Ensure the UI updates correctly when the user changes pages.

**Feature Set 3: Repository Details View**

- Allow users to click on a repository to see more detailed information.
- Fetch and display additional data: language used, open issues, stargazers, forks, top contributors, and more data (if you want)
- Handle loading and error states for this additional data fetch.

**Feature Set 4: Bonus points (not mandatory)**

- Make the app layout responsive for mobile and desktop screens.
- Add meaningful user feedback (e.g., skeleton loaders, clear error messages).
- Documentation of your code and architecture.
- Dark theme
- Unit testing using tools like Vitest, Playwright, or React Testing Library.
- Linting and formatting using ESLint and Prettier.
- CI Deployment using GitHub Actions to platforms like Vercel, GitHub Pages, or Cloudflare.

---

### Submission

Fork this repository and open a PR to main branch.

Happy coding ❤️
