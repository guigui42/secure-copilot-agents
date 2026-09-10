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
