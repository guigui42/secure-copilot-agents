import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

describe('App', () => {
  it('presents the learning path and public sources', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /reduce agent blast radius/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Source index' })).toBeInTheDocument()
    expect(screen.getAllByRole('article').length).toBeGreaterThan(4)

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
  })

  it('explains untrusted instructions as an agent-specific risk', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Untrusted instructions' }))

    expect(
      screen.getByText(/contains instructions designed to redirect the agent/i),
    ).toBeInTheDocument()
  })

  it('only shows path statuses that are present in the selected scenario', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Privileged workflow' }))

    expect(
      screen.queryByText('Coverage gap', { selector: '.path-legend span' }),
    ).not.toBeInTheDocument()
  })

  it('updates the maturity assessment locally', async () => {
    const user = userEvent.setup()
    render(<App />)

    const checks = screen.getAllByRole('checkbox')
    await user.click(checks[0])
    await user.click(checks[1])
    await user.click(checks[2])

    expect(screen.getByText('Controlled')).toBeInTheDocument()
  })
})
