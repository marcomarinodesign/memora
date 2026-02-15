# Project Template

## Environment Variables

### GROQ_API_KEY

The app uses [Groq](https://console.groq.com/) for AI-powered acta generation. You must configure `GROQ_API_KEY` before using the generate-acta feature.

**Local development**

1. Create a `.env.local` file in the project root (it is gitignored).
2. Add your key:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```
3. Restart the dev server (`npm run dev`).

**Vercel deployment**

1. Go to your project on [Vercel](https://vercel.com).
2. Open **Settings** → **Environment Variables**.
3. Add `GROQ_API_KEY` with your Groq API key.
4. Redeploy the project for changes to take effect.

> **Security:** Never commit API keys. The key is only used server-side and is never exposed to the browser.

## Tech Stack
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui

## AI Usage
This repository is optimized for Cursor.
See `/contracts` for development and design rules.

## Design References
- https://ui.shadcn.com/
- https://www.shadcndesign.com/

## Deployment
Ready for Vercel deployment.