import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

interface HydroPayload {
  page_views?: Array<{
    context?: Record<string, string>
    page: string
    title: string
  }>
  events?: Array<{
    context?: Record<string, string>
    page: string
    title: string
    type: string
  }>
}

async function interceptAnalytics(
  page: Page,
  payloads: HydroPayload[] = [],
) {
  await page.route('https://collector.githubapp.com/**', async (route) => {
    payloads.push(route.request().postDataJSON() as HydroPayload)
    await route.fulfill({ status: 204 })
  })

  return payloads
}

test('supports the guided surface workflow', async ({ page }) => {
  await interceptAnalytics(page)
  await page.goto('./')

  await expect(
    page.getByRole('heading', {
      name: /secure github copilot agents/i,
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

  await page.getByRole('button', { name: 'Untrusted instructions' }).click()
  await expect(
    page.getByText(/contains instructions designed to redirect the agent/i),
  ).toBeVisible()
})

test('publishes complete search and sharing metadata', async ({ page, request }) => {
  await interceptAnalytics(page)
  await page.goto('./')

  await expect(page).toHaveTitle(
    'Secure GitHub Copilot Agents | Enterprise Security Guide',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://guigui42.github.io/secure-copilot-agents/',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /secure GitHub Copilot coding agents/i,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /social-card\.png$/,
  )
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  )
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent()
  expect(JSON.parse(structuredData ?? '{}')).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
  })

  const robots = await request.get('./robots.txt')
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).toContain(
    'Sitemap: https://guigui42.github.io/secure-copilot-agents/sitemap.xml',
  )

  const sitemap = await request.get('./sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain(
    '<loc>https://guigui42.github.io/secure-copilot-agents/</loc>',
  )
})

test('has no detectable WCAG A or AA violations', async ({ page }) => {
  await interceptAnalytics(page)
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
  await interceptAnalytics(page)
  await page.goto('./')

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test('publishes one page view and batches controlled interactions', async ({
  context,
  page,
}) => {
  const payloads = await interceptAnalytics(page)

  await page.goto('./')
  await page.getByLabel('Copilot surface').selectOption('cloud')

  await expect.poll(
    () => payloads.flatMap((payload) => payload.events ?? []).length,
  ).toBe(1)

  const pageViews = payloads.flatMap((payload) => payload.page_views ?? [])
  const events = payloads.flatMap((payload) => payload.events ?? [])

  expect(pageViews).toHaveLength(1)
  expect(pageViews[0]).toMatchObject({
    context: {
      site: 'secure-copilot-agents',
    },
    title: 'Secure GitHub Copilot Agents | Enterprise Security Guide',
  })
  expect(events).toEqual([
    expect.objectContaining({
      context: {
        action: 'change',
        category: 'filter',
        label: 'surface:cloud',
        site: 'secure-copilot-agents',
      },
      type: 'secure_copilot_agents.interaction',
    }),
  ])

  const cookies = await context.cookies()
  expect(cookies).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: '_octo',
        sameSite: 'Lax',
        secure: true,
      }),
    ]),
  )
})
