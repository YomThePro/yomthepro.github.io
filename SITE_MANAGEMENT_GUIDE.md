# YOM Site Management Guide

## What was built

This website is a Next.js personal site with four public pages and one private content dashboard:

- `/` — home page
- `/writing` — writing archive
- `/about` — about page
- `/contact` — contact page
- `/studio` — static content editor

The Studio was created so content can be updated from forms instead of editing React or CSS files.

## Using Studio

1. Visit `/studio` on the live site, or run `pnpm dev` and visit `http://localhost:3000/studio`.
2. Change the content you want.
3. Select **Download changes** or **Download all changes**.
4. In GitHub, replace `app/_content/site.json` with the downloaded file and commit the change.
5. GitHub Actions builds and deploys the update automatically.

GitHub Pages is a static host. It cannot securely use a Studio password or write files from the live website. Do not place a password in the static site because visitors could inspect it.

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

Studio downloads an updated content file. This works both locally and on GitHub Pages: download it, replace `app/_content/site.json` in GitHub, and commit the file.

GitHub Pages cannot write files from a live website. A remote always-editable, password-protected dashboard would need an external content database or GitHub API integration. Do not expose a writable Studio online without authentication and persistent storage.

## Design and code locations

- `app/globals.css` — colours, spacing, responsive design, and Studio styling
- `app/_components/site-chrome.tsx` — shared header and footer
- `app/page.tsx` — home page layout
- `app/writing/page.tsx` — writing archive layout
- `app/about/page.tsx` — about page layout
- `app/contact/page.tsx` — contact page layout
- `app/studio/` — static Studio interface and content download
- `.github/workflows/deploy-pages.yml` — GitHub Pages build and deployment workflow

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
