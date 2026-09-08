# YOM Site Management Guide

## What was built

This website is a Next.js personal site with four public pages and one private content dashboard:

- `/` — home page
- `/writing` — writing archive
- `/about` — about page
- `/contact` — contact page
- `/studio` — private content manager

The Studio was created so content can be updated from forms instead of editing React or CSS files.

## Using Studio

1. Start the local website with `pnpm dev`.
2. Visit `http://localhost:3000/studio`.
3. Enter the Studio password configured in `.env.local`.
4. Change the content you want.
5. Select **Save changes** or **Save all changes**.
6. Open **View site** to review the result.
7. Commit and deploy the updated `app/_content/site.json` file when you are happy.

The password is deliberately stored only in `.env.local`, which is ignored by Git. Do not put it in this guide, a commit, or a public message.

## What Studio can edit

### Site settings

- Site name and wordmark text
- Navigation labels
- Status label in the header
- Footer message and copyright
- Browser title and search-engine description

### Home page

- Small label, headline, and introduction
- Animated topic labels
- Writing-section label, heading, and archive link label

### Writing page

- Archive label, headline, and introduction
- Every writing entry’s date, category, title, and short description
- Add and remove writing entries

### About page

- Intro label, headline, and introduction
- Dark card heading and paragraph
- Contact link label

### Contact page

- Intro label and headline
- Email address
- Intro paragraph

## Where content is stored

All editable content lives in:

`app/_content/site.json`

The public pages read this content through `app/_content/site.ts`. This keeps the site content separate from the visual layout code.

## Important deployment note

Studio saves to a local file. This is ideal while working locally: save in Studio, check the site, then commit and deploy the generated content change.

Normal static hosts, including GitHub Pages, cannot write files from a live website. A remote always-editable dashboard would need an external content database or GitHub API integration. Do not expose a writable Studio online without authentication and persistent storage.

## Design and code locations

- `app/globals.css` — colours, spacing, responsive design, and Studio styling
- `app/_components/site-chrome.tsx` — shared header and footer
- `app/page.tsx` — home page layout
- `app/writing/page.tsx` — writing archive layout
- `app/about/page.tsx` — about page layout
- `app/contact/page.tsx` — contact page layout
- `app/studio/` — password check, save action, and Studio interface

## Comments and future features

The current site does not have a public visitor-comment system. A real comment feature needs spam prevention, moderation, user identity rules, and a database; it should not be implemented as a public file-writing form. Studio already manages all content that currently appears on the site.

Useful future additions include individual writing article pages, image uploads through a hosted service, a contact form, analytics, and a database-backed commenting system with moderation.

## Verification completed

After the latest changes, TypeScript, ESLint, whitespace checks, and the production Next.js build should be run with:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```
