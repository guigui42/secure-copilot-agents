import { AnalyticsClient } from '@github/hydro-analytics-client'

const EVENT_TYPE = 'secure_copilot_agents.interaction'
const HYDRO_APP_ID_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

type InteractionCategory =
  | 'appearance'
  | 'code'
  | 'filter'
  | 'navigation'
  | 'progress'
  | 'scenario'
  | 'source'

type InteractionAction =
  | 'change'
  | 'click'
  | 'complete'
  | 'copy'
  | 'open'
  | 'uncomplete'

export interface AnalyticsInteraction {
  category: InteractionCategory
  action: InteractionAction
  label: string
}

export interface AnalyticsTransport {
  readonly collectorUrl: string
  sendPageView: () => void
  sendBatchedEvent: (type: string, context: Record<string, string>) => void
}

export function createAnalyticsClient(
  appId: string | undefined,
): AnalyticsTransport | undefined {
  const normalizedAppId = appId?.trim()

  if (!normalizedAppId) {
    return undefined
  }

  if (!HYDRO_APP_ID_PATTERN.test(normalizedAppId)) {
    throw new Error(`Invalid Hydro app ID: ${normalizedAppId}`)
  }

  return new AnalyticsClient({
    collectorUrl: `https://collector.githubapp.com/${normalizedAppId}/collect`,
    baseContext: {
      site: 'secure-copilot-agents',
    },
  })
}

export function createConfiguredAnalyticsClient(
  appId: string | undefined,
  reportError: (error: Error) => void = (error) => {
    console.error('Analytics disabled because its configuration is invalid.', error)
  },
): AnalyticsTransport | undefined {
  try {
    return createAnalyticsClient(appId)
  } catch (error) {
    reportError(error instanceof Error ? error : new Error(String(error)))
    return undefined
  }
}

const analyticsClient = createConfiguredAnalyticsClient(
  import.meta.env.VITE_HYDRO_APP_ID,
)

export function trackPageView(client = analyticsClient) {
  client?.sendPageView()
}

export function trackInteraction(
  interaction: AnalyticsInteraction,
  client = analyticsClient,
) {
  client?.sendBatchedEvent(EVENT_TYPE, { ...interaction })
}
