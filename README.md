# March91

A digital magazine site for **March '91, NUST's official student magazine**, built with Next.js. Stories come from the magazine's scraped Instagram data, and a small newsroom admin lets staff edit them or write new ones.

## Features

**Public site**
- **Homepage** with a hero that fits one screen, a headline ticker, latest stories, Watch & Listen reels, shorts, category sections, student spotlight and most loved.
- **/articles** lists every story, with section tabs (News, Features, Style), search, sort, topic browsing and load more. Filters have their own URLs, for example `/articles?section=Style` or `/articles?topic=Fashion`.
- **/articles/[slug]** is a full article page: hero image, credits, tags, share and save, related stories and a link to the original Instagram post.

**Newsroom (staff)**
- **/admin/login** is the staff sign-in. The header's **Newsroom** button leads here.
- **/admin** is the articles table, with status tabs, category filter and search.
- **/admin/write** writes a new article (headline, summary, cover image, content blocks, tags) with Write and Preview modes.
- **/admin/editor?slug=…** is the publishing options screen: headline highlight, summary, body, category, tags, status, homepage placement, headline ticker, meta description and a live preview.

Saving in the admin updates the whole site at once: homepage, stories list and article pages.

## Getting started

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

To open the newsroom, go to `/admin/login`, enter any email and password, and sign in.

## How the data works

| File | What it is |
|---|---|
| `data/march91magazine_full.json` / `.csv` | Scraped Instagram profile and posts. The source for every story. |
| `data/march91magazine_posts.json` / `.csv` | Lighter scrape of the same posts. |
| `data/overrides.json` | Staff edits to scraped stories, keyed by slug. Created on first save. |
| `data/custom.json` | Articles written in the newsroom. Created on first save. |
| `data/uploads/` | Cover images uploaded in the newsroom. |
| `public/img/p/` | Post images for the scraped stories. |

`lib/data.ts` turns each scraped post into an article: the editorial title and category, a summary, body paragraphs and credits taken from the caption, tags, and a read time. It then applies any staff edits and rebuilds whenever the store files change. `lib/store.ts` reads and writes the JSON files.

Only articles with the status **Published** appear on the site. Drafts and in-review articles are visible in the admin only.

In the article body, a line starting with `##` is a heading and a line starting with `>` is a pull quote.

## Project structure

```
app/
  page.tsx                  homepage
  articles/                 stories list and [slug] article pages
  admin/                    login and the newsroom screens
  api/admin/article/        save API (create and update)
  api/img/[name]/           serves uploaded cover images
components/                 site sections, header, article browser, admin screens
lib/
  data.ts                   builds articles from the scraped data and staff edits
  store.ts                  file-backed store for edits, new articles and uploads
data/                       scraped data and the staff edit files
```

## Known limitations

- **Sign-in is a placeholder.** Any email and password work. Signing in sets a cookie that the save API checks, but this is not real security, and the admin pages can be opened without signing in. Add real authentication before putting this on the public internet.
- **Saving needs a writable filesystem.** Edits are written to files in `data/`, so this works locally or on a VPS or Docker volume, but not on serverless hosts like Vercel. For those, move the store to a database such as Supabase.
- **Images inside an article body** can't be saved yet. Only the cover image is.
- **No comments or audio.** Comment counts and discussion link to the original Instagram post.

## Tech

Next.js 15 (App Router), React 19, TypeScript. Fonts: Instrument Serif, Newsreader and Inter via `next/font`.
