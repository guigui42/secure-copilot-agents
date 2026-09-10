import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('supports the guided surface workflow', async ({ page }) => {
  await page.goto('./')

  await expect(
    page.getByRole('heading', {
      name: /reduce agent blast radius/i,
      level: 1,
    }),
  ).toBeVisible()

  await page.getByLabel('Copilot surface').selectOption('cloud')

  await expect(
    page.getByRole('heading', { name: 'Secure Copilot cloud agent' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Set enterprise permissions' }),
  ).toHaveCount(0)

  await page.getByRole('button', { name: 'Untrusted MCP' }).click()
  await expect(
    page.getByText(/introduces an unreviewed MCP server/i),
  ).toBeVisible()
})

test('has no detectable WCAG A or AA violations', async ({ page }) => {
  await page.goto('./')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([])
})

test('fits the selected viewport without horizontal overflow', async ({ page }) => {
  await page.goto('./')

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})
