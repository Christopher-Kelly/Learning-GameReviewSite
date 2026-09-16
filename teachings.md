# Teachings — Code Issues & Refactors

## Security Vulnerabilities

- **Token storage mismatch** — `login.js` saved the JWT to `window.sessionStorage` but `requestWrapper.js` read it from `localStorage`. These are separate browser APIs, so every authenticated API call sent no token at all after login.
  - Fix: Aligned both to `localStorage`.

- **Open authentication backdoor** — The `/auth` route unconditionally called `setIsLogged(true)` with no credential check. Any user who navigated to `/auth` was marked as logged in regardless of whether they had a valid token.
  - Fix: Removed the `/auth` route entirely. Auth state is now only set after a real login response from the backend.

- **Client-supplied user identity in API requests** — The review submission hardcoded `username: 'hardcore99'` and `gameId: 16`, and the plan was to pass `userID` from `localStorage` in the request body. A malicious user could change their `userID` in storage and post reviews as any other user.
  - Fix: Removed `userID` and `username` from the request payload entirely. The backend already receives the signed JWT in the `Authorization` header and should derive user identity from that — the client should never be trusted to identify itself.

- **Auth state lost on page refresh** — `isLogged` was initialised to `false` unconditionally. Refreshing the page reset auth state to logged-out even when a valid token sat in `localStorage`, so `ProtectedRoute` would redirect logged-in users back to `/login`.
  - Fix: Initialised `isLogged` with a lazy state initialiser — `useState(() => !!localStorage.getItem("token"))` — so it reads the token on first render.

- **No handling of expired or rejected tokens (401)** — When the backend returned a 401, each component caught the error locally with no shared behaviour. The token was never cleared and the user was never redirected to login, leaving the app in a broken authenticated-but-rejected state.
  - Fix: Added a global 401 handler in `requestWrapper.js` that clears the token from `localStorage` and redirects to `/login` before re-throwing the error.

- **No logout path** — There was no way to clear the token or reset auth state short of opening DevTools manually.
  - Fix: Added a `logout` function to `AuthContext` that removes the token and sets `isLogged(false)`. Exposed as a Logout button in the navbar, visible only when authenticated.

---

## Functional Bugs

- **`StarRating` value never used** — `StarRating` held its own internal state, so the selected rating was invisible to `GamePage`. The review form always submitted a hardcoded `rating: 2.5`.
  - Fix: Made `StarRating` a controlled component accepting `value` and `onChange` props. `GamePage` owns the rating state and passes it down.

- **`GamePage` used the wrong `gameId`** — The review submission hardcoded `gameId: 16` regardless of which game page the user was on. The `gameId` was already available from `useParams`.
  - Fix: Used `parseInt(gameId)` from `useParams` in the `postReviews` call.

- **`Auth.js` mutated context directly** — The component set `authContext.isLoggedIn = true` (direct mutation, wrong key — the actual key is `isLogged`) instead of calling `setIsLogged`. Direct mutation of React context does not trigger a re-render, so nothing would have updated.
  - Fix: Rewrote to destructure `{ setIsLogged }` from context and call it inside a `useEffect`.

- **`useEffect` missing dependency array in `FirstPage`** — `document.title` was set in a `useEffect` with no dependency array, causing it to run after every render rather than once on mount.
  - This is noted but left as-is per existing scope.

---

## Code Quality Issues

- **Unused and broken imports** — `Routes.js` imported `BrowserRouter` but never used it (already provided by `App.js`). `registration.js` imported `useNavigate` twice — once normally and once aliased as `navigate`.

- **`console.log(process.env)` in production paths** — Both `login.js` and `registration.js` logged the full environment variable object on every form submission, exposing API endpoint configuration to anyone with DevTools open.

- **Debug `console.log` left in `ProtectedRoute`** — `console.log(loggedIn)` was left in the protected route guard, printing auth context on every protected navigation.

- **Empty placeholder files** — `Search.js`, `Profile.js`, `Page.js` (before refactor), and `urls.js` were empty files committed to the repo, adding noise with no content.

- **`statusValidation.js` had wrong logic and was unused** — The function returned `true` for status codes 201–404, meaning 401 (Unauthorized) and 403 (Forbidden) would be treated as successful responses. The function was never imported anywhere so caused no live harm, but would have been dangerous if wired up.

---

## Refactors (No Bugs, Just Improvements)

- **`Page` layout component** — Pages manually composed `<NavBar />` + content with no consistent background or spacing. A shared `Page` wrapper now provides the dark background, centred container, responsive padding, and NavBar in one place — pages just wrap their content in `<Page>`.

- **`form.styles.js`** — Both forms used unstyled `<input>`, `<label>`, and `<button>` elements with no visual feedback. Shared styled primitives (`FormWrapper`, `FormTitle`, `FormTextField`, `SubmitButton`, `ApiErrorAlert`, `SuccessAlert`) now give consistent dark-themed UI across both forms. Crucially, `FormTextField` accepts `errors` and `touched` as props and derives its own `error`/`helperText` state, so the existing validation logic required zero changes.

- **`HomePage` with React Suspense** — The original page used a single `isLoading` flag, meaning the entire page showed a loading message until all data was ready. Refactored to use React 19's `use()` hook with one `<Suspense>` boundary per category row. Each category renders a skeleton spinner independently and populates as its fetch resolves, giving a staggered progressive-load feel. `withRandomDelay` wraps each fetch with a random 500–2500ms delay to demonstrate this visually.

- **`CategorySlider`** — Replaced the plain `overflowX: auto` scroll div with a controlled Netflix-style carousel. Arrow buttons step through the list in pages of 5, with modulo wrap-around so the list is infinite — reaching the end returns to the start. Arrows are disabled when a category has 5 or fewer games (nothing to scroll).
