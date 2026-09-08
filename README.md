# YOM personal site

## Content Studio

Run the site locally with `pnpm dev`, then open [http://localhost:3000/studio](http://localhost:3000/studio).
There you can change the Home, Writing, About, and Contact content, add writing entries, and save everything without editing code. The Studio saves to `app/_content/site.json`.

Before publishing the changes, commit and deploy the updated `site.json` file as usual. A standard static host (including GitHub Pages) cannot save changes directly from a live website. If you later host this on a writable server, set `STUDIO_PASSWORD` in its environment to protect remote Studio access.

## Editing the site manually

- **All text and writing entries:** `app/_content/site.json`
- **Page layout:** the matching files in `app/`
- **Colours and visual layout:** `app/globals.css`

Each `page.tsx` folder is a different page on the same site:

- `app/page.tsx` → `/`
- `app/writing/page.tsx` → `/writing`
- `app/about/page.tsx` → `/about`
- `app/contact/page.tsx` → `/contact`
- `app/studio/page.tsx` → `/studio` (content manager)

## Running the site

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
