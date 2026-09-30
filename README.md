# YOM.

A small personal site for notes, pictures, progress, and the occasional hello.

Built with Next.js and exported as a static site, so it runs on GitHub Pages
with no server and no database.

## The pages

| Page | What it is |
| --- | --- |
| `/` | The front door: headline, topics, and the most recent notes |
| `/writing` | Every note, newest first |
| `/pictures` | Collected frames, each with a short note about why it was kept |
| `/progress` | Goals with progress bars and an overall average |
| `/about` | A brief introduction |
| `/contact` | Email address, with a one-click copy button |
| `/studio` | The private content editor |

## Things worth knowing

**The opening animation plays once.** A first-time visitor sees a short
intro; after that the site goes straight to the content. It never appears for
visitors who have reduced-motion switched on, and it stays out of the way of
Studio.

**Studio is password-locked, but that is not real security.** The site is a
static export, so the password ships inside the public JavaScript and anyone
reading the source can find it. It keeps casual visitors out of the editor. A
genuinely private editor would need a server.

**Content lives in one file.** Every word, picture, and goal comes from
`app/_content/site.json`. Studio edits that file and hands it back to you;
commit it and the site redeploys.

**The music player is opt-in.** It appears only once you give it a track, and
it never starts playing on its own. The cursor style is off by default.

## Design

Ink, paper, lime, and purple, with a serif italic for emphasis. Colours and
spacing live in `app/globals.css`.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

```bash
pnpm build    # static output into out/
pnpm lint
```

Deployment is handled by GitHub Actions on every push to `main`.
