# ReeseArch64 Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, focused on performance, accessibility, and a modern user experience.

## ✨ Features

- Responsive interface with light/dark/system theme support.
- Internationalization with three locales: `pt-BR`, `en-US`, and `es-ES`.
- Project catalog with search, category filter, and incremental loading.
- Skills section with search by name and variants.
- Experiences section consuming external JSON data.
- Custom 404 page.

## 🧱 Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS v4 + base components (`shadcn`/Radix)
- **Icons:** `lucide-react`
- **Theming:** `next-themes`
- **Code quality:** ESLint, Prettier
- **Release automation:** semantic-release + Conventional Commits

## 📁 Main structure

```text
app/                 # Routes and global layout (App Router)
components/ui/       # Reusable UI components
i18n/                # Translation files (pt-BR, en-US, es-ES)
assets/              # Local static assets
public/              # Manifest and public files
lib/                 # Utilities
```

## 🚀 Running locally

### 1) Prerequisites

- Node.js 20+
- npm 10+

### 2) Installation

```bash
npm install
```

### 3) Development

```bash
npm run dev
```

Application available at `http://localhost:3000`.

## 📜 Available scripts

- `npm run dev` — starts the development server.
- `npm run build` — creates the production build.
- `npm run start` — starts the app in production mode.
- `npm run lint` — runs ESLint.

- `npm run check` — checks formatting with Prettier.
- `npm run format` — formats files with Prettier.
- `npm run check-types` — runs TypeScript type checking without emitting files.
- `npm run release` — runs automated release (semantic-release).

## 🌍 Internationalization

Translation files are located at:

- `i18n/pt-BR.json`
- `i18n/en-US.json`
- `i18n/es-ES.json`

The locale is detected from the browser and persisted in `localStorage`.

## 🔌 Data source

The app consumes public JSON data hosted in the `reesearch64-api` repository:

- `skills.json`
- `projects.json`
- `experiences.json`

Client-side in-memory caching is used for 5 minutes to reduce repeated requests.

## ✅ Quality and automation

- Git hooks with Husky (`pre-commit`, `pre-push`, `commit-msg`).
- `lint-staged` for validating changed files.
- Commitlint using the Conventional Commits standard.
- CI and release workflows in `.github/workflows`.

## 📄 License

This project is licensed under the terms defined in the `LICENSE` file.
