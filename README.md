# Nexus Engineering Documentation Portal

A lightweight, developer-focused documentation portal built with React, Vite, and TypeScript. It provides a searchable repository of internal technical documentation with an integrated AI assistant for quick context-aware help.

**Tech Stack**
- **Frontend:** React + TypeScript
- **Bundler/Dev Server:** Vite
- **UI Icons:** lucide-react
- **AI Integration:** @google/genai (example service wrapper in `services/geminiService.ts`)

**Highlights**
- Searchable document index with modal search (`components/SearchModal.tsx`).
- Focused reading view with metadata and actions (`App.tsx`).
- Small AI assistant for contextual questions (`components/AIAssistant.tsx`).

**Getting Started**

Prerequisites
- Node.js 18+ and npm

Local setup
1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open in browser
- Visit `http://localhost:5173` (or the port Vite reports)

Configuration
- Application constants live in `constants.tsx` and initial sample docs are defined there.
- Types are declared in `types.ts`.

Project Structure (key files)
- `App.tsx`: Main layout and document viewer.
- `components/SearchModal.tsx`: Repository search UI.
- `components/AIAssistant.tsx`: AI chat and context helper.
- `services/geminiService.ts`: Thin wrapper around the GenAI client.
- `tsconfig.json`: TypeScript configuration (JSX, module resolution adjustments applied).

Types & Tooling Notes
- This project uses TypeScript with the `react-jsx` runtime. If you see errors about missing JSX runtime or React types, run:

```bash
npm install -D @types/react @types/react-dom
```

Contributing
- Feel free to open issues or PRs. For code changes, follow the existing TypeScript and Tailwind styling patterns.

License
- Add a license file if you plan to publish the repo publicly.

Contact
- For more context about this project, check `architecture.md` and `metadata.json`.

---

If you'd like, I can also:
- Add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Set up GitHub Actions for linting and type-checking.
