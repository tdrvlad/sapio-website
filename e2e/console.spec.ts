import { test, expect } from '@playwright/test';

test.describe('Sapio Console', () => {
  test('should display the console section', async ({ page }) => {
    await page.goto('/');
    
    // Look for the console section
    const consoleSection = page.getByText(/Sapio Console/i);
    await expect(consoleSection).toBeVisible();
  });

  test('should have an input field', async ({ page }) => {
    await page.goto('/');
    
    // Find the input field (adjust selector based on your actual implementation)
    const input = page.getByPlaceholder(/Ask your question/i);
    await expect(input).toBeVisible();
  });

  test('should allow typing in the input field', async ({ page }) => {
    await page.goto('/');
    
    const input = page.getByPlaceholder(/Ask your question/i);
    await input.fill('Hello, Sapio!');
    await expect(input).toHaveValue('Hello, Sapio!');
  });
});

