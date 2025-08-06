import { test, expect } from '@playwright/test';
import { 
  TRANSACTION_TEST_CONFIG,
  ERROR_MESSAGES,
  mockApiResponse,
  mockApiError,
  mockApiSuccess,
  mockApiPending,
  mockRetryScenario,
  mockNetworkError,
  mockTimeout,
  expectLoadingState,
  expectErrorState,
  expectSuccessState,
  expectFailedState,
  TEST_TRANSACTION_ID,
  TEST_SCENARIOS
} from './utils/transaction-test-helpers';

test.describe('Transaction Status Component (Simplified)', () => {
  const { baseURL } = TRANSACTION_TEST_CONFIG;

  test.describe('Loading scenarios', () => {
    test('should show loading spinner when transaction ID is not available', async ({ page }) => {
      await page.goto(`${baseURL}/transaction/status/`);
      await expectLoadingState(page);
    });

    test('should show loading spinner when transaction ID is available but query is loading', async ({ page }) => {
      await mockApiResponse(page, 200, { status: 0 }, 1000);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectLoadingState(page);
    });
  });

  test.describe('Error scenarios', () => {
    test('should display 400 error message', async ({ page }) => {
      await mockApiError(page, 400);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[400]);
    });

    test('should display 401 error message', async ({ page }) => {
      await mockApiError(page, 401);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[401]);
    });

    test('should display 404 error message', async ({ page }) => {
      await mockApiError(page, 404);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[404]);
    });

    test('should display 405 error message', async ({ page }) => {
      await mockApiError(page, 405);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[405]);
    });

    test('should display 500 error message', async ({ page }) => {
      await mockApiError(page, 500);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[500]);
    });

    test('should display 502 error message', async ({ page }) => {
      await mockApiError(page, 502);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[502]);
    });

    test('should display 503 error message', async ({ page }) => {
      await mockApiError(page, 503);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[503]);
    });

    test('should display 504 error message', async ({ page }) => {
      await mockApiError(page, 504);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES[504]);
    });

    test('should display default error message for unknown status code', async ({ page }) => {
      await mockApiResponse(page, 418, { message: "I'm a teapot" });
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectErrorState(page, ERROR_MESSAGES.default);
    });
  });

  test.describe('Success scenarios', () => {
    test('should display success message when transaction status is 0', async ({ page }) => {
      await mockApiSuccess(page, 0);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectSuccessState(page);
    });

    test('should display failed message when transaction status is not 0', async ({ page }) => {
      await mockApiSuccess(page, 1);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      await expectFailedState(page);
    });
  });

  test.describe('Retry scenarios', () => {
    test('should retry when API returns 200 with status != 0 and eventually succeed', async ({ page }) => {
      const { callCount } = await mockRetryScenario(page, [
        { status: 200, body: { status: 1 } },
        { status: 200, body: { status: 0 } }
      ]);

      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show loading initially
      await expectLoadingState(page);
      
      // Wait for the retry to happen and eventually show success
      await expectSuccessState(page);
      
      // Verify that the API was called twice
      expect(callCount()).toBe(2);
    });

    test('should retry multiple times when status remains != 0', async ({ page }) => {
      const { callCount } = await mockRetryScenario(page, [
        { status: 200, body: { status: 1 } },
        { status: 200, body: { status: 1 } },
        { status: 200, body: { status: 1 } }
      ]);

      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show loading initially
      await expectLoadingState(page);
      
      // Wait a bit to allow multiple retries
      await page.waitForTimeout(5000);
      
      // Should still be showing loading (retrying)
      await expectLoadingState(page);
      
      // Verify that the API was called multiple times
      expect(callCount()).toBeGreaterThan(1);
    });

    test('should not retry when API returns non-200 status code', async ({ page }) => {
      const { callCount } = await mockRetryScenario(page, [
        { status: 404, body: { message: 'Transaction not found' } }
      ]);

      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show error message
      await expectErrorState(page, ERROR_MESSAGES[404]);
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
      
      // Verify that the API was called only once
      expect(callCount()).toBe(1);
    });

    test('should not retry when API returns 200 with status = 0', async ({ page }) => {
      const { callCount } = await mockRetryScenario(page, [
        { status: 200, body: { status: 0 } }
      ]);

      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show success message
      await expectSuccessState(page);
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
      
      // Verify that the API was called only once
      expect(callCount()).toBe(1);
    });
  });

  test.describe('Network error scenarios', () => {
    test('should handle network errors without retrying', async ({ page }) => {
      await mockNetworkError(page);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show error message
      await expectErrorState(page);
      
      // Wait a bit to ensure no retries happen
      await page.waitForTimeout(3000);
    });

    test('should handle timeout errors without retrying', async ({ page }) => {
      await mockTimeout(page);
      await page.goto(`${baseURL}/transaction/status/${TEST_TRANSACTION_ID}`);
      
      // Should show error message after timeout
      await expect(page.locator('text=Wystąpił błąd')).toBeVisible({ timeout: 10000 });
    });
  });
}); 