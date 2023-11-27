import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'svelte-menu' })).toBeVisible()

  await page.getByText('Menu - CLOSED').click()

  await expect(
    page.getByRole('heading', { name: 'Menu - OPENING' })
  ).toBeVisible()

  await expect(
    page.getByRole('heading', { name: 'Menu - OPENED' })
  ).toBeVisible()

  await page.getByRole('heading', { name: 'section1' }).click()
  await expect(page.getByText('Contents1')).toBeVisible()
  await page.getByRole('heading', { name: 'section2' }).click()
  await page.getByRole('button', { name: 'close2' }).click()
  await expect(page.getByText('Contents2')).not.toBeVisible()
  await page.getByRole('heading', { name: 'section3' }).click()
  await page.getByRole('button', { name: 'close3' }).click()
  await expect(page.getByText('Contents3')).not.toBeVisible()

  await page.getByText('Menu - OPENED').click()

  await expect(page.getByText('Menu - CLOSED')).toBeVisible()
})
