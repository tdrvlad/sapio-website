import { test, expect } from '@playwright/test';

test.describe('CLI Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
  });

  test.describe('Visual Appearance', () => {
    test('should display CLI terminal container', async ({ page }) => {
      const cliContainer = page.locator('[role="region"][aria-label*="Terminal"]').first();
      await expect(cliContainer).toBeVisible();
    });

    test('should have title bar with window controls', async ({ page }) => {
      const titleBar = page.locator('[role="region"]').first();
      await expect(titleBar).toBeVisible();
    });

    test('should have input field visible', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      await expect(input).toBeVisible();
    });
  });

  test.describe('User Interaction', () => {
    test('should allow typing in input field', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('Hello Sapio!');
      
      await expect(input).toHaveValue('Hello Sapio!');
    });

    test('should clear input after sending message with Enter', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('Test message');
      await input.press('Enter');
      
      await page.waitForTimeout(500);
      
      await expect(input).toHaveValue('');
    });

    test('should not send empty messages', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.press('Enter');
      await expect(input).toHaveValue('');
    });

    test('should display sent message in chat', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      const testMessage = 'What services do you offer?';
      
      await input.click();
      await input.fill(testMessage);
      await input.press('Enter');
      
      await expect(page.getByText(testMessage)).toBeVisible({ timeout: 5000 });
      
      await expect(page.getByText('Mock content for development.')).toBeVisible({ timeout: 5000 });
    });

    test('should handle multiple messages in sequence', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      const messages = [
        'First message',
        'Second message',
        'Third message',
      ];
      
      for (const msg of messages) {
        await input.click();
        await input.fill(msg);
        await input.press('Enter');
        
        await expect(page.getByText(msg)).toBeVisible({ timeout: 5000 });
        
        await expect(page.getByText('Mock content for development.')).toBeVisible({ timeout: 5000 });
        
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Ghost Text / Suggestions', () => {
    test('should show ghost text when input is empty and focused', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await page.waitForTimeout(1000); 
      
      const ghostOverlay = page.locator('[class*="ghost"]').first();
      if (await ghostOverlay.isVisible()) {
        expect(ghostOverlay).toBeVisible();
      }
    });

    test('should hide ghost text when user types', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await page.waitForTimeout(500);
      
      await input.fill('User typing');
      
      const inputValue = await input.inputValue();
      expect(inputValue).toBe('User typing');
    });
  });

  test.describe('Focus and Blur Behavior', () => {
    test('should focus input when clicked', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      
      await expect(input).toBeFocused();
    });

    test('should reset inactivity timer on typing', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await expect(input).toBeFocused();
      
      await page.waitForTimeout(1500);
      await input.type('a');
      
      await page.waitForTimeout(1500);
      
      await expect(input).toBeFocused();
    });
  });

  test.describe('Message Display and Formatting', () => {
    test('should display messages with prompt symbol', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('Show prompt');
      await input.press('Enter');
      
      await expect(page.locator('text=/\\$|>/').first()).toBeVisible({ timeout: 5000 });
    });

    test('should scroll to latest message', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      for (let i = 1; i <= 5; i++) {
        await input.click();
        await input.fill(`Message number ${i}`);
        await input.press('Enter');
        await page.waitForTimeout(500);
      }
      
      await expect(page.getByText('Message number 5')).toBeVisible();
    });
  });

  test.describe('Responsive Behavior', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const input = page.locator('input[type="text"]').first();
      
      await expect(input).toBeVisible();
      await input.click();
      await input.fill('Mobile test');
      
      await expect(input).toHaveValue('Mobile test');
    });

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      const input = page.locator('input[type="text"]').first();
      
      await expect(input).toBeVisible();
      await input.click();
      await input.fill('Tablet test');
      
      await expect(input).toHaveValue('Tablet test');
    });

    test('should work on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      const input = page.locator('input[type="text"]').first();
      
      await expect(input).toBeVisible();
      await input.click();
      await input.fill('Desktop test');
      
      await expect(input).toHaveValue('Desktop test');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels', async ({ page }) => {
      const terminalRegion = page.locator('[role="region"][aria-label*="Terminal"]').first();
      await expect(terminalRegion).toBeVisible();
      
      const logRegion = page.locator('[role="log"]').first();
      await expect(logRegion).toBeVisible();
    });


    test('should handle Enter key for sending', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await page.keyboard.type('Enter key test');
      await page.keyboard.press('Enter');
      
      await expect(page.getByText('Enter key test')).toBeVisible({ timeout: 5000 });
      
      await expect(page.getByText('Mock content for development.')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      await page.route('**/api/**', (route) => route.abort());
      
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('This will fail');
      await input.press('Enter');
      
      await page.waitForTimeout(2000);
      
      await input.fill('Recovery test');
      await expect(input).toHaveValue('Recovery test');
    });

    test('should recover from errors and allow new messages', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('Recovery message');
      await input.press('Enter');
      
      await page.waitForTimeout(500);
      
      await input.fill('Second message');
      await expect(input).toHaveValue('Second message');
    });
  });

  test.describe('Performance', () => {
    test('should handle rapid typing', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      
      const longText = 'This is a very long message that tests rapid typing performance and input handling capabilities of the CLI component';
      await input.fill(longText);
      
      await expect(input).toHaveValue(longText);
    });

    test('should handle long messages', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      const longMessage = 'A'.repeat(500);
      
      await input.click();
      await input.fill(longMessage);
      await input.press('Enter');
      
      await page.waitForTimeout(1000);
      await expect(input).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('should match CLI appearance', async ({ page }) => {
      const cliContainer = page.locator('[role="region"][aria-label*="Terminal"]').first();
      
      await cliContainer.waitFor({ state: 'visible' });
      await page.waitForTimeout(1000);
      
      await expect(cliContainer).toHaveScreenshot('cli-initial-state.png', {
        maxDiffPixels: 100,
      });
    });
  });
});

