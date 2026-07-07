import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('hero heading and primary CTA are visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'The Best Streaming Experience' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Start Watching Now' })).toBeVisible()
})

test('the next-category arrow scrolls the category row', async ({ page }) => {
  // Narrow viewport guarantees the 5 category cards overflow and need scrolling.
  await page.setViewportSize({ width: 480, height: 800 })
  await page.goto('/')
  const row = page.getByTestId('categories-row')

  const before = await row.evaluate((el) => el.scrollLeft)
  await page.getByRole('button', { name: 'Scroll categories right' }).click()
  await expect.poll(() => row.evaluate((el) => el.scrollLeft)).toBeGreaterThan(before)
})

test('FAQ accordion is single-open: opening item 2 closes item 1', async ({ page }) => {
  await page.goto('/')

  const item1 = page.getByRole('button', { name: /What is StreamVibe\?/ })
  const item2 = page.getByRole('button', { name: /How much does StreamVibe cost\?/ })

  await expect(item1).toHaveAttribute('aria-expanded', 'true')

  await item2.click()

  await expect(item1).toHaveAttribute('aria-expanded', 'false')
  await expect(item2).toHaveAttribute('aria-expanded', 'true')
})

test('pricing toggle switches between monthly and yearly prices', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('$9.99')).toBeVisible()

  await page.getByRole('button', { name: 'Yearly' }).click()

  await expect(page.getByText('$101.90')).toBeVisible()
  await expect(page.getByText('$9.99')).not.toBeVisible()
})

test('footer in-page anchor scrolls to its section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Pricing' }).click()
  await expect(page).toHaveURL(/#pricing$/)
  await expect(
    page.getByRole('heading', { name: "Choose the plan that's right for you" }),
  ).toBeInViewport()
})

test('unknown routes fall back to the 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  await expect(page.getByText('404')).toBeVisible()
})

test('home page has no automatically detectable accessibility violations (default state)', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'The Best Streaming Experience' })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('home page has no automatically detectable accessibility violations (FAQ item 2 open, yearly pricing)', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: /How much does StreamVibe cost\?/ }).click()
  await page.getByRole('button', { name: 'Yearly' }).click()

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
