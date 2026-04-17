Deployment notes (no Docker)

Frontend (Vercel):
- Use `frontend` as the project root.
- Build: `npm run build` (Vite produces `dist`).
- Vercel config: `frontend/vercel.json` included.

Backend (Render / Railway / Heroku / VPS):
- This repository runs a long-lived Socket.IO server; serverless platforms (Vercel/Lambda) do not reliably support WebSockets.
- Recommended: Render, Railway, or a VPS (PM2). Example start command: `node src/index.js`.
- Files provided: `backend/Procfile` (Heroku/Render), `backend/ecosystem.config.js` (PM2).

Environment variables:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `CLOUDINARY_URL` / `CLOUDINARY_*` — if used

Quick deploy examples:

Heroku / Render / Railway:
1. Create a new service, point repo to `backend`.
2. Set build/start command: `npm install` then `npm start`.
3. Add required environment variables.

Vercel (Frontend):
1. Import project into Vercel.
2. Set the root to `frontend` or use the provided `frontend/vercel.json`.
3. Deploy.
