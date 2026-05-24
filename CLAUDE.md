# CLAUDE.md

## Project Overview

Frontend for a video game discovery and review platform. The navbar branding calls it **Hyper Cinema**, though the npm package name is `untitled1`. Users can browse games by category, view individual game pages with reviews, and submit ratings. Authentication is handled with a JWT stored client-side after login or registration.

The app talks to a local backend at `http://localhost:8080` (configured in `.env.development`).

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| UI framework | React 19 (`react@^19.2.3`) |
| Routing | React Router v7 (`react-router-dom@^7.13.1`) |
| Component library | MUI v9 (`@mui/material`, `@mui/icons-material`) with Emotion |
| CSS framework | Bootstrap 5 + React-Bootstrap 2 |
| HTTP client | Axios 1 |
| Video player | react-player 3 |
| Test runner | Jest 27 + React Testing Library 16 |
| Bundler | Create React App (`react-scripts 5`) |
| Babel | `@babel/preset-env` + `@babel/preset-react` (via `babel.config.js`) |

---

## Project Structure

```
app/
├── src/
│   ├── api/                  # Domain-specific API call modules
│   │   ├── games.js          # findGamesByCategory, findAllCategories, findGameInfo
│   │   ├── reviews.js        # postReviews, getReviews
│   │   └── users.js          # createUser, loginUser
│   ├── axiosWrapper/         # Low-level HTTP abstraction
│   │   ├── requestWrapper.js # Core axios wrapper — attaches Bearer token, sets baseURL
│   │   ├── methods.js        # GET/POST factory keyed by URL
│   │   ├── statusValidation.js # Unused helper (validates HTTP status ranges)
│   │   └── urls.js           # Empty file
│   ├── components/           # Reusable UI components
│   │   ├── AuthContext.js    # React context: isLogged + setIsLogged
│   │   ├── AppErrorBoundary.js # Class-based error boundary wrapping the entire app
│   │   ├── ProtectedRoute.js # Redirects to /login if not authenticated
│   │   ├── StarRating.js     # MUI Rating component (0.5-step precision)
│   │   ├── login.js          # LoginForm component
│   │   ├── navbar.js         # React-Bootstrap NavBar ("Hyper Cinema")
│   │   ├── registration.js   # RegistrationForm component
│   │   └── Page.js           # Empty placeholder component
│   ├── pages/                # Route-level page components
│   │   ├── HomePage.js       # Category browser — fetches categories then games per category
│   │   ├── GamePage.js       # Individual game detail + reviews + rating submission form
│   │   ├── LoginPage.js      # NavBar + LoginForm
│   │   ├── RegistrationPage.js # NavBar + RegistrationForm
│   │   ├── FirstPage.js      # Protected landing page with a YouTube embed via ReactPlayer
│   │   ├── Auth.js           # Auth callback stub (broken — see Quirks)
│   │   ├── ErrorPage.js      # Minimal error page
│   │   ├── Search.js         # Empty file
│   │   └── Profile.js        # Empty file
│   ├── routes/
│   │   └── Routes.js         # React Router <Routes> config
│   ├── App.js                # Root: AuthProvider + BrowserRouter + Router
│   ├── TestApp.js            # AppErrorBoundary wrapper around App (used as the real entry point)
│   └── index.js              # ReactDOM root — renders <TestApp />
├── tests/
│   └── firstPage.spec.js     # Only test: renders FirstPage, checks document.title
├── public/                   # Static assets (index.html, favicon, manifests)
├── .env.development          # All backend URL configuration
├── babel.config.js           # Babel config for Jest
├── jest.config.js            # Standalone Jest config (jsdom, babel-jest, CSS proxy)
└── package.json
```

---

## Running the App Locally

The backend must be running at `http://localhost:8080` first.

```bash
npm install
npm start
```

App opens at `http://localhost:3000`.

---

## Running Tests

Two ways to run the test suite — they use different configs:

```bash
# Via react-scripts (CRA's bundled Jest):
npm test

# Via standalone Jest (uses jest.config.js + babel.config.js):
npx jest
```

The single test file is at `tests/firstPage.spec.js` (outside `src/`). CRA's test runner (`react-scripts test`) expects tests inside `src/`, so the standalone `npx jest` command is needed to actually pick it up. The test mocks `react-player` and checks that `FirstPage` renders and sets `document.title`.

**Test framework**: Jest 27 + `@testing-library/react` 16.

---

## Environment Variables

All variables are in `.env.development`. They must be prefixed with `REACT_APP_` to be injected by CRA.

| Variable | Purpose |
|---|---|
| `REACT_APP_BACKEND_REGISTRATION_URL` | Base URL for all API calls (`http://localhost:8080`) |
| `REACT_APP_GAMES_ALL` | `/api/game/all` |
| `REACT_APP_CATEGORIES_ALL` | `/api/game/categories/all` |
| `REACT_APP_CATEGORY_GAME` | `/api/game/categories/game` |
| `REACT_APP_GAME_BY_ID` | `/api/game/games/id` |
| `REACT_APP_GAME_BY_NAME` | `/api/game/games/name` |
| `REACT_APP_RATING_GAME` | `/api/ratings/rating/game` |
| `REACT_APP_RATING_POST` | `/api/ratings/rating/new` |
| `REACT_APP_USER_NEW` | `/api/user/create` |
| `REACT_APP_USER_LOGIN` | `/api/user/login` |
| `REACT_APP_ADMIN_NEW_GAME` | `/api/game/admin/newgame` |
| `REACT_APP_GAME_NEW` | `/api/game/admin` |

Note: `.gitignore` contains `.env.*` which would normally exclude `.env.development` — but this file is committed to the repo and must be present for the app to function.

---

## Coding Conventions

- **Named exports** for all components and functions. Default export only used for `App.js` and `Page.js`.
- **Functional components** everywhere except `AppErrorBoundary` (which must be a class for `componentDidCatch`).
- **`const` arrow functions** for components: `export const MyComponent = () => {...}`.
- **Inline styles** for layout (e.g. `style={{ display: "flex", gap: "10px" }}`), CSS files for page-specific overrides (`FirstPage.css`, `Page.css`, `index.css`).
- **Error handling pattern** in forms: `errors` state object keyed by field name; `touched` state tracks which fields have been blurred; validation runs on blur and on submit; API errors are stored under `errors.apiError`.
- **API layer**: all HTTP calls go through `axiosWrapper/requestWrapper.js`. Domain modules in `src/api/` call `methods(url).GET(params)` or `methods(url).POST(data)`.
- **Routing**: public routes are flat; protected routes are nested under `<ProtectedRoute />` using React Router's `<Outlet />` pattern.

---

## Known Quirks and Technical Debt

**Token storage bug**: `login.js` saves the JWT to `window.sessionStorage`, but `requestWrapper.js` reads it from `localStorage`. These are different storage mechanisms — authenticated API calls will always send no token after login until this is fixed.

**Auth.js is broken**: The `/auth` route sets `authContext.isLoggedIn = true` (wrong key — the actual key is `isLogged`) and doesn't call `setIsLogged`. The component also renders a `<Link>` with no visible text. This route appears to be an unfinished OAuth callback stub.

**Hardcoded values in GamePage review form**: `onSubmitHandler` sends `{ rating: 2.5, username: 'hardcore99', gameId: 16, userID: 2 }` regardless of the logged-in user or the current game. The `StarRating` component's selected value is never read.

**`TestApp` naming**: The production entry point (`index.js`) renders `<TestApp />`, which is just `<App />` wrapped in `AppErrorBoundary`. The name implies it's a testing artifact.

**Circular-looking import**: `App.js` imports from `routes/Routes.js`, which imports `App` from `../App`. This is intentional — `Routes.js` imports `App` to use as a `<Route element>` — but `App` is the router root, so `/` renders `App` inside itself. The `/` protected route likely has no practical use.

**`FirstPage` useEffect missing dependency array**: Runs after every render instead of once on mount, so `document.title` is reset repeatedly.

**`Routes.js` unused import**: `BrowserRouter` is imported but never used (it's already in `App.js`).

**`registration.js` duplicate import**: `useNavigate` is imported twice — once normally and once aliased as `navigate` (shadowed immediately by the hook call on line 7).

**`ProtectedRoute.js`** has a `console.log(loggedIn)` debug statement left in.

**`statusValidation.js`** and **`urls.js`** — exported but never imported anywhere.

**`Search.js`** and **`Profile.js`** are empty files with no content.

**`Page.js`** exports an empty component and is never referenced.

**Tests outside `src/`**: CRA's `react-scripts test` command will not discover `tests/firstPage.spec.js` by default. Use `npx jest` with the standalone config instead.
