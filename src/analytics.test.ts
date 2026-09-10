import { describe, expect, it, vi } from 'vitest'
import {
  createAnalyticsClient,
  createConfiguredAnalyticsClient,
  trackInteraction,
  trackPageView,
  type AnalyticsTransport,
} from './analytics'

function createTransport(): AnalyticsTransport {
  return {
    collectorUrl: 'https://collector.example.test/collect',
    sendPageView: vi.fn(),
    sendBatchedEvent: vi.fn(),
  }
}

describe('analytics', () => {
  it('creates a client for a valid Hydro app ID', () => {
    const client = createAnalyticsClient(' secure-copilot-agents ')

    expect(client?.collectorUrl).toBe(
      'https://collector.githubapp.com/secure-copilot-agents/collect',
    )
  })

  it('stays disabled when the Hydro app ID is absent', () => {
    expect(createAnalyticsClient(undefined)).toBeUndefined()
    expect(createAnalyticsClient('  ')).toBeUndefined()
  })

  it('rejects malformed Hydro app IDs', () => {
    expect(() => createAnalyticsClient('secure/copilot')).toThrow(
      'Invalid Hydro app ID: secure/copilot',
    )
  })

  it('disables analytics without breaking the app when runtime config is invalid', () => {
    const reportError = vi.fn()

    expect(
      createConfiguredAnalyticsClient('secure/copilot', reportError),
    ).toBeUndefined()
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid Hydro app ID: secure/copilot',
      }),
    )
  })

  it('publishes page views and controlled interaction context', () => {
    const client = createTransport()

    trackPageView(client)
    trackInteraction(
      {
        category: 'filter',
        action: 'change',
        label: 'surface:cloud',
      },
      client,
    )

    expect(client.sendPageView).toHaveBeenCalledOnce()
    expect(client.sendBatchedEvent).toHaveBeenCalledWith(
      'secure_copilot_agents.interaction',
      {
        category: 'filter',
        action: 'change',
        label: 'surface:cloud',
      },
    )
  })
})
