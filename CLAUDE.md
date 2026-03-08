# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevHubShare is a full-stack Q&A platform for developers, built with React (Vite) + Express.js + MySQL. It's structured as a monorepo with `frontend/` and `backend/` workspaces.

## Commands

### Root (run from repo root)
```bash
npm install        # Install all dependencies (root + frontend + backend)
npm run dev        # Start both frontend and backend concurrently
npm run dev-front  # Start frontend only (Vite, port 5173)
npm run dev-back   # Start backend only (Express, port 5000)
npm run lint       # Lint both frontend and backend
npm run fix        # Auto-fix linting errors in both
npm run migrate    # Reset and recreate the database from database.sql
```

### Frontend (from `frontend/`)
```bash
npm run build      # Build production bundle
npm run preview    # Preview production build
```

## Setup

1. Copy `backend/.env.sample` to `backend/.env` and fill in MySQL credentials
2. Copy `frontend/.env.sample` to `frontend/.env` (sets `VITE_BACKEND_URL=http://localhost:4000`)
3. Run `npm run migrate` to initialize the database
4. Run `npm run dev`

The backend runs on `APP_PORT` (default 5000, configured in `.env`). The frontend calls `VITE_BACKEND_URL` for API requests.

## Architecture

### Backend (`backend/`) — Express MVC

- **`index.js`**: Entry point, starts Express server
- **`src/app.js`**: Middleware setup (CORS, JSON parsing, static files, SPA fallback)
- **`src/router.js`**: All API routes — public routes first, then `verifyToken` middleware, then protected routes
- **`auth.js`**: Auth middleware — `hashPassword` (Argon2), `verifyPassword` (returns JWT), `verifyToken` (Bearer token check), `verifyId`
- **`src/models/AbstractManager.js`**: Base class with `find()`, `findAll()`, `delete()` — all managers extend this
- **`src/models/`**: `UserManager`, `LanguageManager`, `PostManager`, `AnswerManager`, `UserHasLanguageManager`
- **`src/controllers/`**: One controller file per resource, used by router
- **`database.sql`**: Schema with pre-populated languages (HTML, CSS, JS, Java, Python, C#, Other)
- **`migrate.js`**: Drops and recreates DB from `database.sql`

### Frontend (`frontend/src/`) — React 18 + Vite

- **`main.jsx`**: Root render with BrowserRouter
- **`App.jsx`**: Route definitions + `SelectedLanguageContext` provider
- **`pages/`**: Page-level components (13 pages)
- **`components/`**: Reusable UI components (Material-UI based)
- **`services/`**: `PrivateRoutes.jsx` (auth guard), `context/` (React contexts)

**Path aliases** (configured in `vite.config.js` and `jsconfig.json`):
- `@assets`, `@components`, `@pages`, `@services`

### Code Quality

- ESLint with Airbnb style + Prettier enforced via Husky pre-commit hook
- Only `console.error()`, `console.warn()`, and `console.info()` are allowed (no `console.log`)
- GitHub Actions runs `npm run lint` on push/PR to main/master/develop/dev branches
