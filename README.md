# Marvis Mission Control Dashboard

Always-online dashboard for JC's AI agent operations.

## Deploy to Vercel (3 steps)

1. Push this folder to a GitHub repo
2. Go to vercel.com → Import project → select the repo
3. Deploy — done. Free, always online.

## Local Dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Update Data

Marvis updates `public/data.json` automatically.
Push to GitHub → Vercel auto-deploys within 30 seconds.

## Structure

- `public/data.json` — live data (agents, tasks, budget, activity)
- `app/page.tsx` — dashboard UI
