# DataScience Blog (React + TypeScript + Vite)

Minimal project scaffold using Vite, React, and TypeScript. Includes small UI primitives (Card, Button) and Tailwind CSS integration.

## Prerequisites

- Node.js (>= 18 recommended)
- npm (bundled with Node)
- Git (optional)

If you use PowerShell and see "cannot be loaded... not digitally signed" errors for `npx`/`npm`, run PowerShell as Administrator and set:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then restart your terminal.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build locally

```bash
npm run preview
```

## Important scripts

- `dev` — start Vite dev server
- `build` — build production assets
- `preview` — preview built assets
- `lint` — run ESLint (if configured)
- `format` — run Prettier (if configured)

(See `package.json` for exact commands.)

## Tailwind CSS

This project uses Tailwind via PostCSS. Ensure you have:

- `tailwindcss`
- `postcss`
- `autoprefixer`

postcss.config.js should include:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

tailwind.config.js example:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Do NOT try to use a non-existent plugin like `@tailwindcss/vite` in your `vite.config.js`. Keep Vite plugins minimal (e.g. `@vitejs/plugin-react`).

## Project structure (relevant)

- src/
  - main.tsx
  - App.tsx
  - components/
    - ui/
      - card.tsx
      - button.jsx (or .tsx)
  - styles/
    - index.css (imports Tailwind base/utilities/components)

## UI Primitives

- Card (src/components/ui/card.tsx)

  - Example usage:

  ```tsx
  import { Card, CardContent } from "./components/ui/card";

  <Card className="p-6">
    <CardContent>Content</CardContent>
  </Card>;
  ```

- Button (src/components/ui/button.jsx)
  - Simple accessible button; accepts `className` and forwards props.

If you created files with lowercase filenames (card.tsx), import paths must match exact case:

```ts
import { Card } from "./components/ui/card";
```

## Common issues & fixes

- Module not found: Can't resolve '@/components/...'

  - Vite does not enable `@` alias by default. Use relative imports (`./components/...`) or configure `resolve.alias` in `vite.config.ts`.

- Module not found: Can't resolve './components/ui/card' or './components/ui/button'

  - Ensure the files exist at `src/components/ui/` and filenames + import paths match (case-sensitive on some systems).
  - Example minimal `card.tsx`:

    ```tsx
    import type { ReactNode } from "react";

    interface CardProps {
      children: ReactNode;
      className?: string;
    }

    export function Card({ children, className = "" }: CardProps) {
      return <div className={`rounded shadow ${className}`}>{children}</div>;
    }

    export function CardContent({ children, className = "" }: CardProps) {
      return <div className={className}>{children}</div>;
    }
    ```

- Windows PowerShell script execution errors
  - See "Prerequisites" section above to set `RemoteSigned` for the current user.

## TypeScript

- Keep `tsconfig.json` and `tsconfig.node.json` (if present) configured for project paths.
- If you add path aliases (like `@/`), update both `tsconfig.json` (paths) and `vite.config.ts` (resolve.alias).

## Linting & Formatting

- Configure ESLint + Prettier if needed. Add `eslint` and `prettier` configs to keep code consistent.

## Troubleshooting

- Paste the full error message into issues for faster help.
- Check browser console and terminal logs when debugging dev server.

## License

Add your preferred license text or keep undefined for private use.

---

If you want, I can:

- Add a sample `index.css` with Tailwind imports.
- Add or modify `vite.config.ts` to support path aliases.
- Create missing UI files (card, button) in your repo.
