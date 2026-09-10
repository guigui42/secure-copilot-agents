import {
  BookLockedIcon,
  EyeIcon,
  KeyIcon,
  LockIcon,
  RepoLockedIcon,
  ShieldLockIcon,
  StackCheckIcon,
  WorkflowIcon,
} from '@primer/octicons-react'
import {
  riskScenarios,
  securityLayers,
  type LayerId,
  type Surface,
} from '../content'

interface AgentAccessPathProps {
  surface: Surface
  scenarioId: string
  onScenarioChange: (scenarioId: string) => void
}

const icons = {
  scope: ShieldLockIcon,
  context: BookLockedIcon,
  identity: KeyIcon,
  permission: LockIcon,
  isolation: StackCheckIcon,
  'tool-policy': WorkflowIcon,
  repository: RepoLockedIcon,
  observability: EyeIcon,
} satisfies Record<LayerId, typeof ShieldLockIcon>

export function AgentAccessPath({
  surface,
  scenarioId,
  onScenarioChange,
}: AgentAccessPathProps) {
  const scenario =
    riskScenarios.find((candidate) => candidate.id === scenarioId) ??
    riskScenarios[0]
  const selectedSurface = surface === 'all' ? 'cli' : surface

  const getStatus = (layerId: LayerId) => {
    const layer = securityLayers.find((item) => item.id === layerId)
    if (scenario.gaps[selectedSurface]?.includes(layerId)) {
      return 'gap'
    }
    if (!layer?.surfaces.includes(selectedSurface)) {
      return 'not-applicable'
    }
    if (scenario.primary.includes(layerId)) {
      return 'primary'
    }
    if (scenario.supporting.includes(layerId)) {
      return 'supporting'
    }
    return 'baseline'
  }

  const visibleStatuses = new Set(
    securityLayers.map((layer) => getStatus(layer.id)),
  )

  return (
    <section className="access-path" aria-labelledby="access-path-title">
      <div className="section-heading">
        <div>
          <h2 id="access-path-title">See which layer stops the action</h2>
        </div>
        <p>
          Select a scenario. The path highlights primary controls, supporting
          controls, and surface-specific gaps.
        </p>
      </div>

      <div className="scenario-tabs" aria-label="Risk scenario">
        {riskScenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={scenario.id === item.id}
            onClick={() => onScenarioChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="scenario-summary" role="status">
        <ShieldLockIcon />
        <p>{scenario.description}</p>
      </div>

      <ol className="pathway">
        {securityLayers.map((layer) => {
          const Icon = icons[layer.id]
          const status = getStatus(layer.id)
          const statusLabel = {
            primary: 'Primary',
            supporting: 'Supporting',
            gap: 'Coverage gap',
            baseline: 'Baseline',
            'not-applicable': 'Not applicable',
          }[status]

          return (
            <li key={layer.id} className={`pathway__item pathway__item--${status}`}>
              <div className="pathway__icon" aria-hidden="true">
                <Icon />
              </div>
              <div>
                <span>{statusLabel}</span>
                <strong>{layer.shortLabel}</strong>
                <p>{layer.description}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="path-legend" aria-label="Path status legend">
        {visibleStatuses.has('primary') && (
          <span><i className="legend-dot legend-dot--primary" />Primary control</span>
        )}
        {visibleStatuses.has('supporting') && (
          <span><i className="legend-dot legend-dot--supporting" />Supporting control</span>
        )}
        {visibleStatuses.has('gap') && (
          <span><i className="legend-dot legend-dot--gap" />Coverage gap</span>
        )}
      </div>
    </section>
  )
}
