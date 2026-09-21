# Poteto-mode playbooks

Animated walkthroughs of every [poteto-mode](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md) playbook from [Cursor pstack](https://github.com/cursor/plugins/tree/main/pstack).

**Live:** [https://poteto-mode-playbooks.vercel.app](https://poteto-mode-playbooks.vercel.app)

This is an educational explainer. It is not an official Cursor product. Playbook steps come from the public MIT-licensed markdown in [`pstack/skills/poteto-mode/playbooks`](https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode/playbooks). Content is from poteto / Cursor pstack (MIT). This site only walks those playbooks.

## What it is

`/poteto-mode` is a sticky Cursor skill. It matches a task to one of 23 playbooks, then runs other pstack skills as those steps require. Each page here has:

- The source when-to-use line and numbered steps
- 3–5 example `/poteto-mode` (or skill) prompts you would type to route there
- Short plain-language framing that does not invent steps
- A distinct Three.js motion graphic for that playbook
- Prev / next navigation

Motion pauses when `prefers-reduced-motion: reduce` is set.

Example prompts are adapted from the [pstack README](https://github.com/cursor/plugins/blob/main/pstack/README.md) and [poteto-mode/SKILL.md](https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md) when those files already show one. The rest are realistic user phrasing for that playbook's when-to-use line.

## Run locally

```bash
npm install
npm run dev
```

App Router on [http://127.0.0.1:3847](http://127.0.0.1:3847).

```bash
npm run build
npm start
```

## Stack

Next.js App Router, TypeScript, Tailwind, shadcn/ui, React Three Fiber.

Playbook steps are parsed from `content/playbooks/` (copies of the upstream markdown). If those files are missing at build time, the app fetches the same files from GitHub raw. Catalog metadata lives in `lib/catalog.ts`. Example prompts live in `lib/example-prompts.ts`.

## Credit

- [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack) by [poteto](https://x.com/poteto), MIT
- This walkthrough site is unofficial
