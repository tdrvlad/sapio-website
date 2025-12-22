import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that the page title is present
    await expect(page).toHaveTitle(/Sapio/i);
  });

  test('should have navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check for navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Sapio/i);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Sapio/i);
  });
});

