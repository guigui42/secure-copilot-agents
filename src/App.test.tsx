import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const { trackInteraction } = vi.hoisted(() => ({
  trackInteraction: vi.fn(),
}))

vi.mock('./analytics', () => ({
  trackInteraction,
}))

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

describe('App', () => {
  beforeEach(() => {
    trackInteraction.mockClear()
  })

  it('presents the learning path and public sources', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /secure github copilot agents/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Source index' })).toBeInTheDocument()
    expect(screen.getAllByRole('article').length).toBeGreaterThan(4)

    expect(
      screen.getByRole('link', { name: /copilot panorama/i }),
    ).toHaveAttribute('href', 'https://gh.io/copilot-panorama')
    expect(screen.getByRole('link', { name: '@guigui42' })).toHaveAttribute(
      'href',
      'https://github.com/guigui42',
    )

    const scopeModule = document.querySelector('#scope')
    const scopeActionLink = scopeModule?.querySelector<HTMLAnchorElement>(
      '.action-doc-link[href*="custom-properties"]',
    )
    expect(scopeActionLink).not.toBeNull()
    expect(
      scopeModule?.querySelector(
        '.module__sources a[href*="custom-properties"]',
      ),
    ).toBeNull()

    const contextModule = document.querySelector('#context')
    expect(contextModule?.querySelector('.action-doc-link')).toBeNull()
    expect(
      contextModule?.querySelector(
        '.module__sources a[href*="content-exclusion"]',
      ),
    ).not.toBeNull()
    expect(
      contextModule?.querySelector('.module__sources a[href*="cloud-agent"]'),
    ).not.toBeNull()

    const mergeModule = document.querySelector('#merge-path')
    expect(
      mergeModule?.querySelector('.action-doc-link[href*="code-owners"]'),
    ).toBeNull()
    expect(
      mergeModule?.querySelector('.module__sources a[href*="code-owners"]'),
    ).not.toBeNull()
    expect(
      mergeModule?.querySelector('.action-doc-link[href*="reviewing-proposed"]'),
    ).not.toBeNull()

    const permissionsModule = document.querySelector('#permissions')
    expect(
      permissionsModule?.querySelector(
        '.action-doc-link[href*="enterprise-managed-settings"]',
      ),
    ).toBeNull()
    expect(
      permissionsModule?.querySelector(
        '.module__sources a[href*="enterprise-managed-settings"]',
      ),
    ).not.toBeNull()

    for (const link of document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="http"]',
    )) {
      expect(link.target).toBe('_blank')
      expect(link.rel).toContain('noopener')
      expect(link.rel).toContain('noreferrer')
    }
  })

  it('filters the learning path by surface', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText('Copilot surface'), 'cloud')

    expect(
      screen.getByRole('heading', { name: 'Secure Copilot cloud agent' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Set enterprise permissions' }),
    ).not.toBeInTheDocument()

    const permissionLayer = screen.getByText('Permission').closest('li')
    expect(permissionLayer).toHaveTextContent('Coverage gap')
    expect(screen.getByText('Coverage gap', { selector: '.path-legend span' }))
      .toBeInTheDocument()
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'filter',
      action: 'change',
      label: 'surface:cloud',
    })
  })

  it('copies the public page link from the header title', async () => {
    const user = userEvent.setup()
    const clipboardWriteText = vi.spyOn(navigator.clipboard, 'writeText')
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Copy page link' }))

    expect(clipboardWriteText).toHaveBeenCalledWith('https://gh.io/secure-copilot')
    expect(
      screen.getByRole('button', { name: 'Page link copied' }),
    ).toBeInTheDocument()
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'navigation',
      action: 'copy',
      label: 'brand-page-link',
    })
  })

  it('explains untrusted instructions as an agent-specific risk', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Untrusted instructions' }))

    expect(
      screen.getByText(/contains instructions designed to redirect the agent/i),
    ).toBeInTheDocument()
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'scenario',
      action: 'change',
      label: 'prompt-injection',
    })
  })

  it('only shows path statuses that are present in the selected scenario', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Privileged workflow' }))

    expect(
      screen.queryByText('Coverage gap', { selector: '.path-legend span' }),
    ).not.toBeInTheDocument()
  })

  it('tracks learning progress, code copies, and source visits', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getAllByRole('button', { name: 'Mark complete' })[0])
    await user.click(screen.getAllByRole('button', { name: 'Copy' })[0])

    const sourceLink = document.querySelector<HTMLAnchorElement>('.source-table a')
    expect(sourceLink).not.toBeNull()
    await user.click(sourceLink!)
    await user.click(screen.getByRole('link', { name: /copilot panorama/i }))
    await user.click(screen.getByRole('link', { name: '@guigui42' }))

    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'progress',
      action: 'complete',
      label: 'scope',
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'code',
      action: 'copy',
      label: 'identity:isolated-cli-state',
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'source',
      action: 'open',
      label: 'index:managed-settings',
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'navigation',
      action: 'click',
      label: 'header-copilot-panorama',
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'navigation',
      action: 'click',
      label: 'footer-profile',
    })
  })

  it('tracks each module completion transition without stale state', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getAllByRole('button', { name: 'Mark complete' })[0]
    await user.click(button)
    await user.click(screen.getAllByRole('button', { name: 'Completed' })[0])

    expect(button).toHaveTextContent('Mark complete')
    expect(trackInteraction).toHaveBeenNthCalledWith(1, {
      category: 'progress',
      action: 'complete',
      label: 'scope',
    })
    expect(trackInteraction).toHaveBeenNthCalledWith(2, {
      category: 'progress',
      action: 'uncomplete',
      label: 'scope',
    })
  })

  it('updates the maturity assessment locally', async () => {
    const user = userEvent.setup()
    render(<App />)

    trackInteraction.mockClear()
    const checks = screen.getAllByRole('checkbox')
    await user.click(checks[0])
    await user.click(checks[1])
    await user.click(checks[2])

    expect(screen.getByText('Controlled')).toBeInTheDocument()
    expect(trackInteraction).not.toHaveBeenCalled()
  })
})
