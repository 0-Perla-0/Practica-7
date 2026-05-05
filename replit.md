# Cinemax

A Netflix-style movie browsing app in Spanish with user profile selection, favorites, categories, and PayPal payment integration.

## Run & Operate

- `npm run dev` — start dev server on port 5000
- `npm run build` — production build to `dist/`
- `npm run lint` — run ESLint

## Stack

- React 19 + Vite 8
- React Router DOM 7
- @paypal/react-paypal-js
- No backend — fully client-side SPA

## Where things live

- `src/pages/` — route-level page components (Home, Category, MovieDetail, Search, Favorites, FreeMovies, ProfileSelect)
- `src/components/` — reusable UI components (Navbar, Footer, Hero, MovieCard, MovieGrid, Loader, PayPalButton)
- `src/data/` — static data / mock data
- `src/hooks/` — custom React hooks
- `src/App.jsx` — router setup
- `vite.config.js` — Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)

## Architecture decisions

- Pure client-side SPA — no server or API backend
- Static deployment target (`dist/`) via `npm run build`
- Profile selection stored locally (no auth backend)
- PayPal integration via `@paypal/react-paypal-js` for in-app purchases

## Product

- Profile selection screen (up to multiple user profiles)
- Movie browsing by category and search
- Movie detail pages with PayPal payment button
- Favorites list per profile
- Free movies section

## User preferences

_Populate as you build_

## Gotchas

- Vite must use `host: '0.0.0.0'` and `allowedHosts: true` for Replit preview to work

## Pointers

- Deployment: `.local/skills/deployment/SKILL.md`
- Workflows: `.local/skills/workflows/SKILL.md`
