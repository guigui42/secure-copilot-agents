import { useEffect, useMemo, useState } from 'react'
import {
  BookIcon,
  CheckIcon,
  ChevronDownIcon,
  CopilotIcon,
  DeviceDesktopIcon,
  KeyIcon,
  LinkExternalIcon,
  MarkGithubIcon,
  MoonIcon,
  ShieldCheckIcon,
  SunIcon,
  TerminalIcon,
} from '@primer/octicons-react'
import { AgentAccessPath } from './components/AgentAccessPath'
import { CodeExample } from './components/CodeExample'
import { MaturityAssessment } from './components/MaturityAssessment'
import { trackInteraction } from './analytics'
import {
  modules,
  sources,
  strengthLabels,
  surfaceLabels,
  verifiedDate,
  type ActionItem,
  type Audience,
  type Source,
  type Strength,
  type Surface,
} from './content'

const audienceLabels: Record<Audience, string> = {
  both: 'Both',
  admin: 'Admin',
  developer: 'Developer',
}

const surfaceIcons = {
  all: ShieldCheckIcon,
  cli: TerminalIcon,
  app: CopilotIcon,
  vscode: DeviceDesktopIcon,
  cloud: MarkGithubIcon,
} satisfies Record<Surface, typeof ShieldCheckIcon>

function ActionList({
  actions,
  moduleId,
  sourceMap,
  footerSourceIds,
}: {
  actions: ActionItem[]
  moduleId: string
  sourceMap: Map<string, Source>
  footerSourceIds: Set<string>
}) {
  return (
    <ul>
      {actions.map((action) => {
        const source = action.sourceId && !footerSourceIds.has(action.sourceId)
          ? sourceMap.get(action.sourceId)
          : undefined

        return (
          <li key={action.text}>
            {source ? (
              <a
                className="action-doc-link"
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackInteraction({
                    category: 'source',
                    action: 'open',
                    label: `${moduleId}:inline:${source.id}`,
                  })
                }
              >
                {action.text}
                <LinkExternalIcon />
              </a>
            ) : (
              action.text
            )}
          </li>
        )
      })}
    </ul>
  )
}

function getRepeatedActionSourceIds(actions: ActionItem[]) {
  const counts = new Map<string, number>()

  for (const action of actions) {
    if (action.sourceId) {
      counts.set(action.sourceId, (counts.get(action.sourceId) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([sourceId]) => sourceId)
}

function App() {
  const [audience, setAudience] = useState<Audience>('both')
  const [surface, setSurface] = useState<Surface>('all')
  const [scenario, setScenario] = useState('personal-repository')
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('secure-agent-progress') ?? '[]')
    } catch {
      return []
    }
  })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('secure-agent-theme')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.colorMode = theme
    localStorage.setItem('secure-agent-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('secure-agent-progress', JSON.stringify(completed))
  }, [completed])

  const visibleModules = useMemo(
    () =>
      modules.filter(
        (module) => surface === 'all' || module.surfaces.includes(surface),
      ),
    [surface],
  )

  const sourceMap = useMemo(
    () => new Map(sources.map((source) => [source.id, source])),
    [],
  )

  const toggleComplete = (moduleId: string) => {
    const isCompleted = completed.includes(moduleId)
    setCompleted((current) =>
      current.includes(moduleId)
        ? current.filter((item) => item !== moduleId)
        : [...current, moduleId],
    )
    trackInteraction({
      category: 'progress',
      action: isCompleted ? 'uncomplete' : 'complete',
      label: moduleId,
    })
  }

  const progress = Math.round((completed.length / modules.length) * 100)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="Secure GitHub Copilot agents home"
          onClick={() =>
            trackInteraction({
              category: 'navigation',
              action: 'click',
              label: 'brand-home',
            })
          }
        >
          <span><ShieldCheckIcon /></span>
          <strong>Secure Copilot agents</strong>
        </a>

        <div className="header-controls">
          <div className="compact-control" aria-label="Audience">
            {(['both', 'admin', 'developer'] as Audience[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={audience === item}
                onClick={() => {
                  setAudience(item)
                  trackInteraction({
                    category: 'filter',
                    action: 'change',
                    label: `audience:${item}`,
                  })
                }}
              >
                {audienceLabels[item]}
              </button>
            ))}
          </div>

          <label className="surface-select">
            <span className="sr-only">Copilot surface</span>
            <select
              value={surface}
              onChange={(event) => {
                const nextSurface = event.target.value as Surface
                setSurface(nextSurface)
                trackInteraction({
                  category: 'filter',
                  action: 'change',
                  label: `surface:${nextSurface}`,
                })
              }}
            >
              {Object.entries(surfaceLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <ChevronDownIcon />
          </label>

          <button
            type="button"
            className="icon-button"
            aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => {
              const nextTheme = theme === 'dark' ? 'light' : 'dark'
              setTheme(nextTheme)
              trackInteraction({
                category: 'appearance',
                action: 'change',
                label: `theme:${nextTheme}`,
              })
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top">
          <div className="hero__copy">
            <div className="release-note">
              <ShieldCheckIcon />
              Verified against GitHub Docs on {verifiedDate}
            </div>
            <h1>Secure GitHub Copilot agents without blocking useful work.</h1>
            <p className="hero__lede">
              A practical enterprise learning path for securing GitHub Copilot
              coding agents with scoped identity, managed permissions,
              isolation, repository gates, and audit evidence.
            </p>
            <div className="hero__actions">
              <a
                className="primary-action"
                href="#learning-path"
                onClick={() =>
                  trackInteraction({
                    category: 'navigation',
                    action: 'click',
                    label: 'start-learning-path',
                  })
                }
              >
                Start the learning path
              </a>
              <a
                className="secondary-action"
                href="https://github.com/guigui42/secure-copilot-agents"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackInteraction({
                    category: 'navigation',
                    action: 'click',
                    label: 'view-source',
                  })
                }
              >
                <MarkGithubIcon />
                View source
              </a>
            </div>
          </div>

          <div className="threat-model">
            <h2>Contain actions, not just prompts</h2>
            <ul>
              <li><KeyIcon /> Excessive or inherited credentials</li>
              <li><TerminalIcon /> Unsafe commands and tool payloads</li>
              <li><LinkExternalIcon /> Unapproved network destinations</li>
              <li><BookIcon /> Prompt injection in issues, MCP, or web content</li>
              <li><MarkGithubIcon /> Unreviewed privileged workflows</li>
            </ul>
          </div>
        </section>

        <section className="principle-strip" aria-label="Core security principles">
          <div>
            <strong>Primary boundary</strong>
            <span>Credential and repository scope</span>
          </div>
          <div>
            <strong>Runtime boundary</strong>
            <span>Sandbox or ephemeral runner</span>
          </div>
          <div>
            <strong>Change boundary</strong>
            <span>Rulesets, review, and checks</span>
          </div>
          <div>
            <strong>Response evidence</strong>
            <span>Audit, sessions, and telemetry</span>
          </div>
        </section>

        <AgentAccessPath
          surface={surface}
          scenarioId={scenario}
          onScenarioChange={(scenarioId) => {
            setScenario(scenarioId)
            trackInteraction({
              category: 'scenario',
              action: 'change',
              label: scenarioId,
            })
          }}
        />

        <div className="learning-layout" id="learning-path">
          <aside className="learning-nav" aria-label="Learning path">
            <div className="progress-summary">
              <div>
                <span>{completed.length} of {modules.length}</span>
                <strong>{progress}% complete</strong>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="Learning path completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ol>
              {modules.map((module) => (
                <li key={module.id}>
                  <a
                    href={`#${module.id}`}
                    onClick={() =>
                      trackInteraction({
                        category: 'navigation',
                        action: 'click',
                        label: `module:${module.id}`,
                      })
                    }
                  >
                    <span>{module.step}</span>
                    {module.title}
                    {completed.includes(module.id) ? <CheckIcon /> : null}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="module-list">
            <div className="module-list__heading">
              <h2>Build the controls in dependency order</h2>
              <p>
                Identity and repository scope come first. Hooks, instructions,
                and monitoring add value only after the real authorization
                boundaries exist.
              </p>
            </div>

            {visibleModules.map((module) => {
              const repeatedActionSourceIds = new Set(
                getRepeatedActionSourceIds([
                  ...module.adminActions,
                  ...module.developerActions,
                ]),
              )
              const actionSourceIds = new Set(
                [...module.adminActions, ...module.developerActions]
                  .map((action) => action.sourceId)
                  .filter(
                    (sourceId): sourceId is string =>
                      Boolean(sourceId) &&
                      !repeatedActionSourceIds.has(sourceId as string),
                  ),
              )
              const footerSourceIds = module.sourceIds.filter(
                (sourceId) => !actionSourceIds.has(sourceId),
              )

              return (
                <article className="module" id={module.id} key={module.id}>
                <header className="module__header">
                  <span className="step-number">{module.step}</span>
                  <div>
                    <div className="module__meta">
                      {module.strengths.map((strength) => (
                        <span
                          key={strength}
                          className={`strength strength--${strength}`}
                        >
                          {strengthLabels[strength as Strength]}
                        </span>
                      ))}
                    </div>
                    <h3>{module.title}</h3>
                    <p>{module.summary}</p>
                  </div>
                  <button
                    type="button"
                    className={`complete-button ${
                      completed.includes(module.id) ? 'complete-button--done' : ''
                    }`}
                    aria-pressed={completed.includes(module.id)}
                    onClick={() => toggleComplete(module.id)}
                  >
                    <CheckIcon />
                    {completed.includes(module.id) ? 'Completed' : 'Mark complete'}
                  </button>
                </header>

                <div className="risk-callout">
                  <strong>Risk</strong>
                  <p>{module.risk}</p>
                </div>

                <div className="surface-chips" aria-label="Applicable surfaces">
                  {module.surfaces.map((item) => {
                    const Icon = surfaceIcons[item]
                    return (
                      <span key={item}>
                        <Icon />
                        {surfaceLabels[item]}
                      </span>
                    )
                  })}
                </div>

                <div className="action-columns">
                  {(audience === 'both' || audience === 'admin') ? (
                    <section>
                      <h4>Administrator actions</h4>
                      <ActionList
                        actions={module.adminActions}
                        moduleId={module.id}
                        sourceMap={sourceMap}
                        footerSourceIds={repeatedActionSourceIds}
                      />
                    </section>
                  ) : null}
                  {(audience === 'both' || audience === 'developer') ? (
                    <section>
                      <h4>Developer actions</h4>
                      <ActionList
                        actions={module.developerActions}
                        moduleId={module.id}
                        sourceMap={sourceMap}
                        footerSourceIds={repeatedActionSourceIds}
                      />
                    </section>
                  ) : null}
                </div>

                {module.examples?.map((example) => (
                  <CodeExample
                    key={example.title}
                    analyticsLabel={`${module.id}:${example.id}`}
                    example={example}
                  />
                ))}

                <div className="validation-grid">
                  <section>
                    <h4><CheckIcon /> Validate it</h4>
                    <ul>
                      {module.validation.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </section>
                  <section>
                    <h4>Limitations and trade-offs</h4>
                    <ul>
                      {module.limitations.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </section>
                </div>

                {footerSourceIds.length > 0 ? (
                  <footer className="module__sources">
                    <span>Sources</span>
                    {footerSourceIds.map((sourceId) => {
                      const source = sourceMap.get(sourceId)
                      return source ? (
                        <a
                          key={source.id}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackInteraction({
                              category: 'source',
                              action: 'open',
                              label: `${module.id}:footer:${source.id}`,
                            })
                          }
                        >
                          {source.title}
                          <LinkExternalIcon />
                        </a>
                      ) : null
                    })}
                  </footer>
                ) : null}
              </article>
              )
            })}
          </div>
        </div>

        <MaturityAssessment />

        <section className="reality-check" id="reality-check">
          <div className="section-heading">
            <div>
              <h2>Know what each control cannot do</h2>
            </div>
          </div>
          <div className="reality-grid">
            <article>
              <strong>Sandboxing is not authorization.</strong>
              <p>
                Once a permitted process has a credential and network path, the
                credential scope decides which repositories it can affect.
              </p>
            </article>
            <article>
              <strong>Hooks are not a universal API proxy.</strong>
              <p>
                Hooks inspect Copilot tool requests. They do not see every
                network call made inside arbitrary code, and hook timeouts fail open.
              </p>
            </article>
            <article>
              <strong>Instructions are not enforcement.</strong>
              <p>
                Instructions guide behavior. Rulesets, permissions, sandboxing,
                and credentials determine what can actually happen.
              </p>
            </article>
            <article>
              <strong>A domain allowlist does not understand ownership.</strong>
              <p>
                Allowing api.github.com does not distinguish an enterprise
                repository from a personal repository.
              </p>
            </article>
          </div>
        </section>

        <section className="source-index" id="sources" aria-labelledby="sources-title">
          <div className="section-heading">
            <div>
              <h2 id="sources-title">Source index</h2>
            </div>
            <p>
              Exact behavior and availability can change. Re-check preview
              controls before production rollout.
            </p>
          </div>
          <div className="source-table">
            {sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackInteraction({
                    category: 'source',
                    action: 'open',
                    label: `index:${source.id}`,
                  })
                }
              >
                <span>{source.category}</span>
                <strong>{source.title}</strong>
                <LinkExternalIcon />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <ShieldCheckIcon />
          <strong>Secure GitHub Copilot agents</strong>
        </div>
        <p>
          Anonymous usage analytics. Maturity assessment answers remain local.
        </p>
        <a
          href="https://github.com/guigui42/secure-copilot-agents"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackInteraction({
              category: 'navigation',
              action: 'click',
              label: 'footer-repository',
            })
          }
        >
          <MarkGithubIcon />
          Repository
        </a>
      </footer>
    </>
  )
}

export default App
