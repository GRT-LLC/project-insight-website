# Vendored brand marks

These three SVGs are copies. The source of truth is
**jarvis-travel/design-library**, `brand/logo/normalized/`.

| | |
| -- | -- |
| Upstream repo | `jarvis-travel/design-library` |
| Upstream path | `brand/logo/normalized/jarvistravel-{lockup,wordmark,icon}-current.svg` |
| Upstream commit | `60f57a1c8373409d0eef15814a5634b549898f5a` |
| Vendored on | 2026-08-03 |

## Why a copy exists

`scripts/gen-logo-component.mjs` used to read these from an absolute path on
one developer's machine, and the upstream files are not on design-library's
`main` yet — they live on an unmerged branch. So the documented regeneration
command could not run anywhere except that one laptop, and nothing verified
that the committed `Logo.tsx` still matched its source (core review, M1/M3/L7).

Vendoring makes the pipeline reproducible in CI and gives `--check` something
to diff against. The cost is a copy that can drift from upstream, which is why
the commit is pinned above.

## Do not hand-edit

Change the mark upstream, then re-vendor:

```
DESIGN_LIBRARY=../design-library npm run logo:vendor
npm run logo:gen
```

## public/og-card.png

Same story, different asset. The card is built by design-library's
`og/build.mjs`, which lives on the **same unmerged branch** as the marks — so
its provenance was unverifiable from any reachable checkout (review L7). It is
pinned to the commit above.

Rebuild it there and copy the result in; there is no generator for it in this
repo, deliberately, because the pipeline needs fonts and a headless renderer
this site does not otherwise depend on.

Retire this directory once design-library publishes `@jarvis-travel/design-library`
to GitHub Packages (JAR-688) — at that point the marks come from the package and
the pin becomes a version range.
