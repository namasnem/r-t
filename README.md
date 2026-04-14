# Relationships

A personal relationship tracker that uses neutral, observable questions to reduce bias and build an honest picture of your connections over time.

## What it does

Each time you interact with someone, you log the interaction by answering six factual questions — who reached out, how long it lasted, how balanced it was, how you felt afterward, whether they remembered past details, and whether plans were made. The app scores each interaction and tracks a strength rating over time, with a 90-day decay so neglected relationships drift toward 'Fading' honestly.

Your data is stored entirely in your browser's `localStorage` — nothing is sent anywhere.

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages** and set the source to the `gh-pages` branch.
3. Push any commit to `main`. The GitHub Actions workflow will build the project and deploy it automatically.

Your live URL will be `https://your-username.github.io/your-repo-name/`.

## Tech stack

- React 18 with Vite
- No external UI libraries
- `localStorage` for persistence
- GitHub Actions for CI/CD
