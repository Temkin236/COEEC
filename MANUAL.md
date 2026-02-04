# Developer Manual — COEEC Frontend

Quick guide to run, test, and understand API integrations used on the landing page.

1) Prerequisites
- Node.js 16+ and npm

2) Environment
- Copy `.env.example` to `.env` (or set environment variables in your shell). Set `VITE_API_BASE_URL` to the API base (defaults to `https://coeec-dev-backend.onrender.com/api`).

3) Install & Run
```bash
npm install
npm run dev
```

4) What was changed
- `pages/Home.tsx` now fetches: `getNews()`, `getDepartments()`, `getEvents()`, `getMediaFiles()`, `getStaff()`, `getResearchProjects()`, `getDownloads()` and renders live content where available.
- If an API call fails, the UI falls back to empty states and logs errors to the console.

5) How to verify GET integrations
- Open browser devtools Console/Network while running `npm run dev` and load the homepage. Look for requests against `VITE_API_BASE_URL` (e.g. `/news/public`, `/departments`, `/events/public`).
- Example curl to check an endpoint:
```bash
curl -s "${VITE_API_BASE_URL:-https://coeec-dev-backend.onrender.com/api}/news/public" | jq '. | length'
```

6) Testing data / credentials
- See `testing-credentials.md` for suggested testing credentials and example auth curl requests. Note: the backend is external; adding credentials on the backend must be performed on the backend side.

7) Files of interest
- `services/api.ts` — centralized GET helpers used by the UI.
- `pages/Home.tsx` — landing page wiring (news, events, partners, stats).
- `components/Hero.tsx` — banner/hero UI (static). Use `getPageBySlug()` if CMS pages become available.

8) Troubleshooting
- If you see CORS errors, ensure `VITE_API_BASE_URL` points to the correct backend host and that the backend allows your dev origin.
- If network calls return 404/401, check the backend docs at `/api-docs` to confirm the public endpoints.

If you want, I can run the dev server and confirm it starts successfully (requires permission to run commands). 

9) Setting the landing hero image (the photo you provided)
- Place the photo file you shared into the `public` folder at `public/home.jpg`.
- Recommended image size: 1600x900 or larger, JPG or PNG. Filename must be `home.jpg` (or update `pages/Home.tsx` to match your filename).
- After placing the file, reload the dev server page — the hero background will use `/home.jpg`.

If you want, upload the `home.jpg` file here (or tell me the exact path) and I will add it into the project for you.
