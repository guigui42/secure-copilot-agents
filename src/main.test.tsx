import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  createRoot: vi.fn(),
  render: vi.fn(),
  trackPageView: vi.fn(),
}))

vi.mock('react-dom/client', () => ({
  createRoot: mocks.createRoot,
}))

vi.mock('./analytics.ts', () => ({
  trackPageView: mocks.trackPageView,
}))

vi.mock('./App.tsx', () => ({
  default: () => null,
}))

describe('application entry point', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.createRoot.mockReset()
    mocks.render.mockReset()
    mocks.trackPageView.mockReset()
    mocks.createRoot.mockReturnValue({ render: mocks.render })
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('records one page view before React renders', async () => {
    await import('./main.tsx')

    expect(mocks.trackPageView).toHaveBeenCalledOnce()
    expect(mocks.createRoot).toHaveBeenCalledOnce()
    expect(mocks.trackPageView.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.createRoot.mock.invocationCallOrder[0],
    )
  })
})
