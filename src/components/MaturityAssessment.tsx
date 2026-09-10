import { useMemo, useState } from 'react'
import { CheckCircleFillIcon, ChecklistIcon } from '@primer/octicons-react'
import { maturityChecks } from '../content'

export function MaturityAssessment() {
  const [selected, setSelected] = useState<string[]>([])

  const result = useMemo(() => {
    const score = selected.length
    if (score <= 2) {
      return {
        label: 'Baseline',
        description:
          'Start with deployment scope, dedicated identity, and protected review paths.',
      }
    }
    if (score <= 5) {
      return {
        label: 'Controlled',
        description:
          'Your main boundaries exist. Close surface-specific gaps and automate validation.',
      }
    }
    return {
      label: 'High-assurance',
      description:
        'Your layered controls cover prevention, approval, repository enforcement, and response.',
    }
  }, [selected])

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  return (
    <section className="assessment" id="assessment" aria-labelledby="assessment-title">
      <div className="assessment__intro">
        <ChecklistIcon />
        <h2 id="assessment-title">How many layers are active?</h2>
        <p>
          This checklist runs only in your browser. It does not send or store
          assessment data.
        </p>
      </div>

      <div className="assessment__grid">
        <div className="assessment__checks">
          {maturityChecks.map((check) => (
            <label key={check.id}>
              <input
                type="checkbox"
                checked={selected.includes(check.id)}
                onChange={() => toggle(check.id)}
              />
              <span>{check.label}</span>
            </label>
          ))}
        </div>
        <div className="assessment__result" aria-live="polite">
          <CheckCircleFillIcon />
          <span>{selected.length} of {maturityChecks.length} controls</span>
          <strong>{result.label}</strong>
          <p>{result.description}</p>
        </div>
      </div>
    </section>
  )
}
