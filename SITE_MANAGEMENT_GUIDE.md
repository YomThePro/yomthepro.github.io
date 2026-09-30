# YOM Site Management Guide

## What was built

This website is a Next.js personal site with six public pages and one private content dashboard:

- `/` — home page
- `/writing` — writing archive
- `/pictures` — picture gallery, each frame with a context box
- `/progress` — per-goal progress bars with an overall average
- `/about` — about page
- `/contact` — contact page
- `/studio` — static content editor, behind a password screen

The Studio was created so content can be updated from forms instead of editing React or CSS files.

## First-visit intro

The loading animation plays once, the first time somebody opens the site. A small blocking
script in the document head records a `yom-intro-seen` flag in the browser's local storage
before the page paints, so a first-time visitor never sees the page flash up and then get
covered. Returning visitors skip it entirely. It never appears for visitors who have
`prefers-reduced-motion` set, and it stays out of the way of Studio. To watch it again, clear
that local storage key in the browser dev tools.

## Cursor and background music

Both are off by default and are set in Studio under **Cursor & music**.

- **Cursor** accepts `none` (default) or `dot`, plus a hex colour. The dot cursor only
  applies on devices with a fine pointer, so phones and tablets keep normal behaviour.
- **Music** is a playlist, set in Studio under **Music tracks** (one path per line). Drop
  an `.mp3`, `.m4a`, or `.wav` into `public/audio/`, then list its path, e.g.
  `/audio/theme.mp3`. Next serves `public/` from the **root**, so
  `public/audio/theme.mp3` is requested as `/audio/theme.mp3` — never
  `/public/audio/theme.mp3`. Getting this wrong 404s and the player silently does nothing.
  Filenames containing spaces or brackets are fine; each path is URL-encoded for you.
  Tracks play in order, move to the next automatically when one finishes, and the last
  wraps to the first, so it plays continuously once switched on. A file that fails to
  load is skipped instead of stalling the playlist. With the list empty, no player appears.
  Music never autoplays on first visit — the visitor clicks play once, and that choice is
  remembered (`localStorage` key `yom-music`). Do not add a `play()` call outside the
  player's own effects: the autoplay policy blocks it, and a visitor who declined music
  would get it anyway.

## Studio password

Studio asks for a password before showing the editor. This is a **client-side lock only**.
The site is a static export, so the password ships inside the public JavaScript bundle and
anyone who views source can read it. It keeps casual visitors out of the editor; it does not
protect anything, and it is not a substitute for server authentication. A genuinely private
editor needs a server, an external content database, or GitHub API authentication.

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
- Navigation labels, including Pictures and Progress
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

### Pictures page

- Intro label, headline, and introduction
- Every picture’s title, short caption, context box, place, date, frame colour, and image path
- Add and remove pictures

Leave a picture’s **image path** empty to keep the styled placeholder frame. To use a real
photo, put the file in `public/` and enter its path, for example `/pictures/blue-hour.jpg`.
Frame colour accepts `lime`, `purple`, or `ink`.

### Progress page

- Intro label, headline, introduction, and the overall summary label
- Every goal’s label, target, percentage (a slider), and note
- Add and remove goals

The dark summary bar at the top is the average of all goals and is calculated automatically.

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

- `app/globals.css` — colours, spacing, responsive design, Studio styling, intro animation, gallery and progress-bar styling
- `app/_components/site-chrome.tsx` — shared header and footer
- `app/_components/first-visit-loader.tsx` — once-per-visitor loading animation
- `app/page.tsx` — home page layout
- `app/writing/page.tsx` — writing archive layout
- `app/pictures/page.tsx` — picture gallery layout
- `app/progress/page.tsx` — progress page layout
- `app/progress/progress-bars.tsx` — animated bar client component
- `app/about/page.tsx` — about page layout
- `app/contact/page.tsx` — contact page layout
- `app/studio/studio-gate.tsx` — Studio password screen
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
