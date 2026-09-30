# Vita Test™

Interactive surprise mini-game for Vita — built by Zaldi.

A playful web experience that starts as a joke quiz and ends with a marriage proposal.

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- Lucide React

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize

| What | File |
|---|---|
| All text (opening, proposal, final message) | `src/data/story.ts` |
| Quiz questions, options, answers, reactions | `src/data/questions.ts` |
| Proposal photo | `public/images/proposal.jpg` |
| Final reveal photo | `public/images/reveal.jpg` |
| Music | `public/music/music.mp3` |
| WhatsApp link preview | `public/og-image.jpg` |

## Deploy

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Set `NEXT_PUBLIC_SITE_URL` to the production URL so WhatsApp link previews resolve correctly.
