# Copilot instructions

## Project goal

Maintain a clear, source-backed guide for securing GitHub Copilot agentic
workflows. Help readers understand practical controls without overstating what
instructions, hooks, domain filters, or telemetry can enforce.

## Best practices

- Ground product claims in current public GitHub documentation or changelog
  entries. Keep preview, conditional, unsupported, and generally available
  behavior explicit.
- Distinguish hard security boundaries and approval gates from guidance,
  validation, and detective controls.
- Use neutral examples and placeholders. Never add customer data, credentials,
  internal links, private roadmap details, or real repository names.
- Preserve accessibility, responsive behavior, secure external-link handling,
  and the `/secure-copilot-agents/` GitHub Pages base path.
- Keep analytics privacy-preserving. Use only controlled event identifiers and
  never collect maturity-assessment selections, scores, or free-form content.
- Add or update focused tests when behavior, content invariants, metadata, or
  analytics contracts change.

## Patterns to follow

- Treat `src/content.ts` as the source of truth for guide content. Prefer
  extending its typed data model over embedding product content in components.
- Keep source, module, and reference IDs unique and valid. Keep JSON examples
  parseable.
- Keep UI components focused on rendering and interaction. Preserve the
  existing separation between content, analytics, and presentation.
- When verified product content changes, synchronize `verifiedDate` in
  `src/content.ts`, `dateModified` in `index.html`, and `lastmod` in
  `public/sitemap.xml`.
- Follow the existing TypeScript style and reuse established helpers and
  lookup maps rather than duplicating logic.
- For agentic workflows, edit the Markdown source and regenerate the matching
  lock file with `gh aw compile`. Keep generated action references pinned and
  commit `.github/aw/actions-lock.json`.
