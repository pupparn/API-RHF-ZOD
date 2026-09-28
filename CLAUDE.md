@AGENTS.md

# Product Explorer

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 course project. Search/sort/edit products from the DummyJSON API.

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (no test suite)

## Layout

- `src/app/` — routes. `page.tsx` just renders `ProductExplorer`.
- `src/components/` — client components (`"use client"`): `productExplorer` (state + fetch), `productSearchForm`, `productForm`.
- `src/lib/product.ts` — Zod schemas, inferred types, `buildProductUrl`, `fetchProducts`, `CATEGORIES`, `defaultQuery`.
- `src/data/product-fallback.json` — local fallback product data.
- Path alias `@/*` → `./src/*`.

## Conventions

- Zod 4 schemas are the source of truth; derive types with `z.infer`. Validate API responses with `safeParse`.
- Forms use react-hook-form + `@hookform/resolvers` with the Zod schemas.
- User-facing validation/error messages are in Thai.
- Remote images must match `images.remotePatterns` in `next.config.ts` (`cdn.dummyjson.com/product-images/**`). Local placeholder: `public/placeholder.gif`.
- Component files are camelCase (`productForm.tsx`).
