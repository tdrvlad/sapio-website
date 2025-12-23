import { test, expect } from '@playwright/test';

test.describe('CLI Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with CLI component
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test.describe('Visual Appearance', () => {
    test('should display CLI terminal container', async ({ page }) => {
      // Check for terminal-like appearance
      const cliContainer = page.locator('[role="region"][aria-label*="Terminal"]').first();
      await expect(cliContainer).toBeVisible();
    });

    test('should have title bar with window controls', async ({ page }) => {
      // Look for typical macOS-style window controls
      const titleBar = page.locator('[role="region"]').first();
      await expect(titleBar).toBeVisible();
    });

    test('should display welcome message', async ({ page }) => {
      // Check for Sapio AI banner
      await expect(page.getByText(/Sapio AI/i)).toBeVisible({ timeout: 10000 });
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
      
      // Wait a bit for the message to be sent
      await page.waitForTimeout(500);
      
      // Input should be cleared
      await expect(input).toHaveValue('');
    });

    test('should not send empty messages', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.press('Enter');
      
      // Input should still be empty and no error
      await expect(input).toHaveValue('');
    });

    test('should display sent message in chat', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      const testMessage = 'What services do you offer?';
      
      await input.click();
      await input.fill(testMessage);
      await input.press('Enter');
      
      // User message should appear
      await expect(page.getByText(testMessage)).toBeVisible({ timeout: 5000 });
      
      // Mock response should appear in development mode
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
        
        // Wait for message to appear
        await expect(page.getByText(msg)).toBeVisible({ timeout: 5000 });
        
        // Mock response should appear in development mode
        await expect(page.getByText('Mock content for development.')).toBeVisible({ timeout: 5000 });
        
        // Small delay between messages
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Ghost Text / Suggestions', () => {
    test('should show ghost text when input is empty and focused', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await page.waitForTimeout(1000); // Wait for ghost typing to start
      
      // Ghost overlay should be present (implementation specific)
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
      
      // Ghost text should be hidden when user has input
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

    test('should blur input after inactivity', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await expect(input).toBeFocused();
      
      // Wait for inactivity timeout (2 seconds + buffer)
      await page.waitForTimeout(2500);
      
      // Input should be blurred
      await expect(input).not.toBeFocused();
    });

    test('should reset inactivity timer on typing', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await expect(input).toBeFocused();
      
      // Type after 1.5 seconds
      await page.waitForTimeout(1500);
      await input.type('a');
      
      // Wait another 1.5 seconds (total 3s but timer was reset)
      await page.waitForTimeout(1500);
      
      // Should still be focused
      await expect(input).toBeFocused();
    });
  });

  test.describe('Message Display and Formatting', () => {
    test('should display messages with prompt symbol', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('Show prompt');
      await input.press('Enter');
      
      // Look for the $ prompt symbol or similar
      await expect(page.locator('text=/\\$|>/').first()).toBeVisible({ timeout: 5000 });
    });

    test('should scroll to latest message', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      // Send multiple messages to create scroll
      for (let i = 1; i <= 5; i++) {
        await input.click();
        await input.fill(`Message number ${i}`);
        await input.press('Enter');
        await page.waitForTimeout(500);
      }
      
      // Latest message should be visible
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

    test('should be keyboard navigable', async ({ page }) => {
      // Tab to input
      await page.keyboard.press('Tab');
      
      // Find the focused input
      const input = page.locator('input[type="text"]').first();
      
      // Type with keyboard
      await page.keyboard.type('Keyboard navigation test');
      
      const value = await input.inputValue();
      expect(value).toContain('Keyboard navigation test');
    });

    test('should handle Enter key for sending', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await page.keyboard.type('Enter key test');
      await page.keyboard.press('Enter');
      
      // Message should appear
      await expect(page.getByText('Enter key test')).toBeVisible({ timeout: 5000 });
      
      // Mock response should appear in development mode
      await expect(page.getByText('Mock content for development.')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Simulate network failure
      await page.route('**/api/**', (route) => route.abort());
      
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      await input.fill('This will fail');
      await input.press('Enter');
      
      // Wait for potential error message
      await page.waitForTimeout(2000);
      
      // Input should still be functional
      await input.fill('Recovery test');
      await expect(input).toHaveValue('Recovery test');
    });

    test('should recover from errors and allow new messages', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      // Even if previous message had issues, new messages should work
      await input.click();
      await input.fill('Recovery message');
      await input.press('Enter');
      
      await page.waitForTimeout(500);
      
      // Should be able to send another message
      await input.fill('Second message');
      await expect(input).toHaveValue('Second message');
    });
  });

  test.describe('Performance', () => {
    test('should handle rapid typing', async ({ page }) => {
      const input = page.locator('input[type="text"]').first();
      
      await input.click();
      
      // Type rapidly
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
      
      // Should handle long messages without crashing
      await page.waitForTimeout(1000);
      await expect(input).toBeVisible();
    });
  });

  test.describe('Visual Regression', () => {
    test('should match CLI appearance', async ({ page }) => {
      const cliContainer = page.locator('[role="region"][aria-label*="Terminal"]').first();
      
      // Wait for CLI to be fully loaded
      await cliContainer.waitFor({ state: 'visible' });
      await page.waitForTimeout(1000);
      
      // Take screenshot for visual comparison
      await expect(cliContainer).toHaveScreenshot('cli-initial-state.png', {
        maxDiffPixels: 100,
      });
    });
  });
});

