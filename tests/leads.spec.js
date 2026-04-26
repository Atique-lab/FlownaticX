import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FlownaticX/);
});

test('lead submission flow', async ({ page }) => {
  await page.goto('/contact');
  
  // Fill the form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '1234567890');
  await page.fill('textarea[name="message"]', 'Hello from Playwright!');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Check success
  await expect(page.locator('text=Success')).toBeVisible();
});
