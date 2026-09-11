# Secure GitHub Copilot agents

An interactive enterprise learning path for reducing the blast radius of
GitHub Copilot coding agents.

[Open the live site](https://guigui42.github.io/secure-copilot-agents/)

## What it covers

- Dedicated GitHub App identities and governed fine-grained PAT fallbacks.
- Enterprise managed permissions for Copilot CLI, the Copilot app, and VS Code
  sessions using Agent Host.
- Local sandboxing, ephemeral cloud runners, and credential isolation.
- Content exclusions and untrusted-context or prompt-injection boundaries.
- MCP server, plugin, and hook governance.
- Cloud-agent firewall, Agents secrets, workflow approvals, and setup files.
- Rulesets, CODEOWNERS, security checks, audit events, and OpenTelemetry.

The guide distinguishes hard security boundaries from approval gates,
conditional enforcement, behavioral guidance, and detective controls. Preview
and experimental features are labeled explicitly.

## Local development

Prerequisite: [Bun](https://bun.sh/) 1.3.11 or later.

```bash
bun install --frozen-lockfile
bun run dev
```

The Vite development server uses the GitHub Pages base path:

```text
http://localhost:5173/secure-copilot-agents/
```

## Validation

```bash
bun run lint
bun run test
bun run build
bunx playwright install chromium
bun run test:e2e
```

`bun run check` runs the complete local validation sequence.

## Content methodology

- Exact product behavior and availability come from current public GitHub Docs
  and the GitHub Changelog.
- GitHub Well-Architected guidance informs the layered enterprise model.
- Examples use neutral placeholders and contain no real organization, customer,
  repository, credential, or internal link.
- Controls are classified by strength so the site does not present hooks,
  instructions, domain filters, or telemetry as substitutes for authorization.
- The source index and verification date are visible in the application.

## Project structure

```text
src/content.ts             Source-backed modules, examples, and control data
src/components/            Interactive learning components
src/App.tsx                Page composition and audience/surface filtering
public/                    Crawl metadata, icons, and social sharing previews
e2e/site.spec.ts           Responsive and accessibility browser checks
.github/workflows/         CI and GitHub Pages deployment
```

## Deployment

Pushes to `main` build the static site with Bun and Vite, upload the `dist`
artifact, and deploy it through the protected `github-pages` environment.
GitHub Actions are pinned to commit SHAs and Dependabot proposes controlled
updates.

## Contributing

When a GitHub feature changes:

1. Update the applicable content and limitation text in `src/content.ts`.
2. Update the visible verification date.
3. Add or replace the public source.
4. Run `bun run check`.

Do not add customer names, internal GitHub links, private roadmap information,
or credentials.

## License

[MIT](LICENSE)
