# Angular Community Website Template

A production-ready website for an Angular community group. Fork it, edit one config file, and you have a site with a landing page, a roadmap timeline, a meetups scheduler, and an open source showcase.

Built and maintained by [Angular Cameroon](https://github.com/ngcameroon). Originally the ngCameroon site, opened up so other communities do not have to start from an empty `ng new`.

**Live demo:** [template.ngcameroon.com](https://template.ngcameroon.com)

## What you get

- **Landing page** with a hero, community pillars, and a featured project spotlight
- **Roadmap** with an interactive journey diagram: guided tour, phase navigation, minimap, keyboard control
- **Meetups** that sort themselves, featuring the next session with a live countdown and moving finished sessions into a past archive automatically
- **Open Source** showcase for the projects your community maintains
- Angular 21, SSR with prerendering, Tailwind CSS 4, dark theme, responsive, reduced-motion aware

## Requirements

- Node.js 20.x or 22.x
- npm 10+

## Getting started

```bash
npx degit ngcameroon/angular-community-website-template my-community
cd my-community
npm install
npm start
```

The site runs at `http://localhost:4200/`.

## Make it yours

Most of the rebrand happens in one file.

### 1. Identity: `src/app/core/community.config.ts`

Name, wordmark, tagline, city, country, timezone, site URL, GitHub org, social links, hero stats, footer resource links, the three home page pillars, and the featured project. Change these and the navbar, footer, hero, page titles, and meta descriptions all follow.

### 2. Logo: `public/brand/logo.svg`

Drop your own file in at that path and every reference updates. It is used for the navbar, footer, favicon, and web manifest.

### 3. Static tags: `src/index.html`

These cannot read the TypeScript config because they are plain HTML. Replace every `Angular Community` and `your-community.example` with your own name and domain. There is a comment at the top of the file marking exactly what to change.

### 4. Colours: `src/styles.css`

The palette lives in the `@theme` block at the top:

| Token | What it is |
| :--- | :--- |
| `--color-angular-red`, `--color-angular-blue` | Angular brand colours, usually keep these |
| `--color-accent-green`, `--color-accent-red`, `--color-accent-gold` | Your community's accent colours |
| `--color-page-bg`, `--color-surface*`, `--color-text*` | Dark theme surfaces and text |

Change the accent hex values to your own and the whole site follows.

### 5. Content

These files ship with Angular Cameroon's real programme as example data, so you can see what a filled-in site looks like before replacing it:

| File | Drives |
| :--- | :--- |
| `src/app/pages/meetups/meetups.data.ts` | Session list, dates, topics, registration links |
| `src/app/pages/roadmap/journey.data.ts` | Roadmap weeks and phases |
| `src/app/pages/open-source/open-source.data.ts` | Projects on the Open Source page |

### 6. Public files

`public/robots.txt`, `public/sitemap.xml`, and `public/site.webmanifest` all carry the placeholder domain. Swap in yours.

## How the meetups page works

Sessions move themselves. The next upcoming session is featured at the top with a live countdown; during its hour it switches to a "Happening now" state; once it ends it drops into **Past sessions**, dimmed and badged.

Because the page is prerendered to static HTML, the build stamps its own clock into the page via `TransferState`. The first client render reuses that exact value so hydration matches, then it switches to the visitor's real clock. That is why the page is never stale, however long ago you deployed.

Add a session by appending to `MEETUPS` in `meetups.data.ts`. Set `registrationUrl` to a real link and the card's button becomes live; leave it `null` and it reads "Registration opens soon".

## Commands

| Command | What it does |
| :--- | :--- |
| `npm start` | Dev server at `localhost:4200` |
| `npm run build` | Production build with prerendering |
| `npm test` | Unit tests via Vitest |

## Deploying

`vercel.json` is set up for Vercel. Every route is prerendered, so the output is fully static:

- **Output directory:** `dist/community-site/browser`
- **Rewrite:** everything unmatched falls back to `/index.html`

The filesystem is checked before rewrites, so real prerendered routes such as `/roadmap` are served directly and only unknown URLs hit the fallback.

Any static host works. Point it at `dist/community-site/browser` after `npm run build`.

## Project structure

```text
src/app/
├── core/
│   ├── community.config.ts     # start here
│   ├── directives/             # scroll reveal
│   └── services/
├── pages/
│   ├── home/                   # hero, pillars, featured project
│   ├── roadmap/                # journey diagram (ng-diagram)
│   ├── meetups/                # session scheduler
│   └── open-source/            # project showcase
└── shared/components/          # navbar, footer, icon set
```

## Contributing

Issues and pull requests are welcome, especially from communities adopting this. If you fork it and something was harder to change than it should have been, that is a bug worth reporting.

## Licence

MIT. See [LICENSE](./LICENSE). You are free to use this for your community with no attribution required, though a link back is always appreciated.
