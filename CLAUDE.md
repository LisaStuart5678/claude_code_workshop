# CLAUDE.md

## Project Overview
Next.js 14 app using Tailwind CSS + Supabase.
Auth via Supabase Auth. Payments via Stripe.

## Tech Stack
- Frontend: Next.js 14, Tailwind, shadcn/ui
- Backend: Supabase (Postgres + Edge Functions)
- Testing: Vitest + Playwright

## Coding Standards
- TypeScript only. No `any` types.
- Run `npm test` before every commit.
- Use server components by default.

## Key Files
- src/lib/supabase.ts — DB client
- src/app/api/  — all API routes
