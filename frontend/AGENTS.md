<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## General Principles

- Keep implementations simple and readable.
- Do not introduce abstractions before they are useful.
- Prefer explicit code over clever code.
- Avoid unnecessary dependencies.
- Reuse existing patterns before introducing new ones.
- Keep functions focused on one responsibility.
- Do not refactor unrelated code when implementing a feature.
- Do not modify project architecture without a clear reason.
- Preserve existing naming and folder conventions.
- Prefer small, incremental changes.

When multiple solutions are possible, prefer the one that:

1. is easiest to understand,
2. introduces the least additional complexity,
3. fits the existing architecture.

## Stack

The frontend uses:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- pnpm

Do not introduce another frontend framework, CSS framework, state management library, or data-fetching library unless explicitly required.
