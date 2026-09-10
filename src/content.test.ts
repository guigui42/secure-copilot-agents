import { describe, expect, it } from 'vitest'
import { modules, riskScenarios, sources } from './content'

describe('security content', () => {
  it('keeps source references valid', () => {
    const sourceIds = new Set(sources.map((source) => source.id))

    for (const module of modules) {
      for (const sourceId of module.sourceIds) {
        expect(sourceIds.has(sourceId)).toBe(true)
      }
      for (const action of [
        ...module.adminActions,
        ...module.developerActions,
      ]) {
        if (action.sourceId) {
          expect(sourceIds.has(action.sourceId)).toBe(true)
        }
      }
    }
  })

  it('contains parseable JSON examples', () => {
    const jsonExamples = modules.flatMap((module) =>
      (module.examples ?? []).filter((example) => example.language === 'json'),
    )

    expect(jsonExamples.length).toBeGreaterThan(0)
    for (const example of jsonExamples) {
      expect(() => JSON.parse(example.code)).not.toThrow()
    }
  })

  it('uses unique module and source identifiers', () => {
    expect(new Set(modules.map((module) => module.id)).size).toBe(modules.length)
    expect(new Set(sources.map((source) => source.id)).size).toBe(sources.length)
  })

  it('covers content exclusion and untrusted-input risks', () => {
    expect(modules.some((module) => module.id === 'context')).toBe(true)
    expect(
      riskScenarios.some((scenario) => scenario.id === 'prompt-injection'),
    ).toBe(true)
  })
})
