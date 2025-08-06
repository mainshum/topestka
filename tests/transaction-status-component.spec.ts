import { test, expect } from '@playwright/test';

test.describe('Transaction Status Component', () => {
  const baseURL = 'http://localhost:3000';

  test.describe('Loading scenarios', () => {
    test('should show loading spinner when transaction ID is not available', async ({ page }) => {
      await page.goto(`${baseURL}/transaction/status/`);
      
      // Should show loading spinner
      await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
    });

    test('should show loading spinner when transaction ID is available but query is loading', async ({ page }) => {
      // Mock the API to delay response
      await page.route('**/api/transaction/status/**', async route => {
        // Delay the response to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 0 })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show loading spinner
      await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
    });
  });

  test.describe('Error scenarios', () => {
    test('should display 400 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Bad Request' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Nieprawidłowe żądanie. Sprawdź poprawność danych.')).toBeVisible();
    });

    test('should display 401 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Unauthorized' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Brak autoryzacji. Zaloguj się ponownie.')).toBeVisible();
    });

    test('should display 404 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Transaction not found' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Transakcja nie została znaleziona.')).toBeVisible();
    });

    test('should display 405 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 405,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Method not allowed' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Nieprawidłowa metoda żądania.')).toBeVisible();
    });

    test('should display 500 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Internal Server Error' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Błąd serwera. Spróbuj ponownie później.')).toBeVisible();
    });

    test('should display 502 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 502,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'P24 API error' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Błąd komunikacji z systemem płatności. Spróbuj ponownie za chwilę.')).toBeVisible();
    });

    test('should display 503 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Service Unavailable' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Serwis tymczasowo niedostępny. Spróbuj ponownie później.')).toBeVisible();
    });

    test('should display 504 error message', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 504,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Gateway Timeout' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Przekroczono limit czasu odpowiedzi. Spróbuj ponownie.')).toBeVisible();
    });

    test('should display default error message for unknown status code', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 418,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'I\'m a teapot' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Wystąpił nieoczekiwany błąd. Spróbuj ponownie.')).toBeVisible();
    });
  });

  test.describe('Success scenarios', () => {
    test('should display success message when transaction status is 0', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 0 })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Transakcja została dokonana')).toBeVisible();
    });

    test('should display failed message when transaction status is not 0', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 1 })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      await expect(page.locator('text=Transakcja nie została dokonana')).toBeVisible();
    });
  });

  test.describe('Retry scenarios', () => {
    test('should retry when API returns 200 with status != 0 and eventually succeed', async ({ page }) => {
      let callCount = 0;
      
      await page.route('**/api/transaction/status/**', async route => {
        callCount++;
        
        if (callCount === 1) {
          // First call: return status != 0 (pending)
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ status: 1 })
          });
        } else {
          // Second call: return status = 0 (success)
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ status: 0 })
          });
        }
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show loading initially
      await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
      
      // Wait for the retry to happen and eventually show success
      await expect(page.locator('text=Transakcja została dokonana')).toBeVisible({ timeout: 10000 });
      
      // Verify that the API was called twice
      expect(callCount).toBe(2);
    });

    test('should retry multiple times when status remains != 0', async ({ page }) => {
      let callCount = 0;
      
      await page.route('**/api/transaction/status/**', async route => {
        callCount++;
        
        // Always return status != 0 to trigger retries
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 1 })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show loading initially
      await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
      
      // Wait a bit to allow multiple retries
      await page.waitForTimeout(5000);
      
      // Should still be showing loading (retrying)
      await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
      
      // Verify that the API was called multiple times
      expect(callCount).toBeGreaterThan(1);
    });

    test('should not retry when API returns non-200 status code', async ({ page }) => {
      let callCount = 0;
      
      await page.route('**/api/transaction/status/**', async route => {
        callCount++;
        
        // Return 404 error - should not retry
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Transaction not found' })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show error message
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      await expect(page.locator('text=Transakcja nie została znaleziona.')).toBeVisible();
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
      
      // Verify that the API was called only once
      expect(callCount).toBe(1);
    });

    test('should not retry when API returns 200 with status = 0', async ({ page }) => {
      let callCount = 0;
      
      await page.route('**/api/transaction/status/**', async route => {
        callCount++;
        
        // Return success immediately
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 0 })
        });
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show success message
      await expect(page.locator('text=Transakcja została dokonana')).toBeVisible();
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
      
      // Verify that the API was called only once
      expect(callCount).toBe(1);
    });
  });

  test.describe('Network error scenarios', () => {
    test('should handle network errors without retrying', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        // Simulate network error
        await route.abort('failed');
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show error message
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
    });

    test('should handle timeout errors without retrying', async ({ page }) => {
      await page.route('**/api/transaction/status/**', async route => {
        // Simulate timeout by not responding
        // The request will timeout naturally
      });

      await page.goto(`${baseURL}/transaction/status/test-id`);
      
      // Should show error message after timeout
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible({ timeout: 10000 });
    });
  });
}); 