import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page renders the hero content', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'StreamVibe' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Watch parties' })).toBeVisible()
})

test('filtering features narrows the visible cards', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Filter features').fill('chat')

  await expect(page.getByRole('heading', { name: 'Live chat' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Watch parties' })).toHaveCount(0)
})

test('home page has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'StreamVibe' })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})

test('unknown routes fall back to the 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  await expect(page.getByText('404')).toBeVisible()
})
