import { Page, Route, expect } from '@playwright/test';

// Mock response helpers
export async function mockApiResponse(
  page: Page,
  status: number,
  body: any,
  delay?: number
) {
  await page.route('**/api/transaction/status/**', async (route) => {
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body)
    });
  });
}

export async function mockApiError(page: Page, statusCode: number) {
  await mockApiResponse(page, statusCode, { 
    message: `HTTP ${statusCode} Error` 
  });
}

export async function mockApiSuccess(page: Page, status: number = 0) {
  await mockApiResponse(page, 200, { status });
}

export async function mockApiPending(page: Page, status: number = 1) {
  await mockApiResponse(page, 200, { status });
}

// Retry scenario helpers
export async function mockRetryScenario(
  page: Page,
  responses: Array<{ status: number; body: any; delay?: number }>
) {
  let callCount = 0;
  
  await page.route('**/api/transaction/status/**', async (route) => {
    const response = responses[callCount] || responses[responses.length - 1];
    
    if (response.delay) {
      await new Promise(resolve => setTimeout(resolve, response.delay));
    }
    
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body)
    });
    
    callCount++;
  });
  
  return { callCount: () => callCount };
}

// Network error helpers
export async function mockNetworkError(page: Page) {
  await page.route('**/api/transaction/status/**', async (route) => {
    await route.abort('failed');
  });
}

export async function mockTimeout(page: Page) {
  await page.route('**/api/transaction/status/**', async (route) => {
    // Don't respond - let it timeout naturally
  });
}

// Assertion helpers
export async function expectLoadingState(page: Page) {
  await expect(page.locator('text=Trwa weryfikacja transakcji...')).toBeVisible();
}

export async function expectErrorState(page: Page, expectedMessage?: string) {
  await expect(page.locator('text=Wystąpił błąd')).toBeVisible();
  
  if (expectedMessage) {
    await expect(page.locator(`text=${expectedMessage}`)).toBeVisible();
  }
}

export async function expectSuccessState(page: Page) {
  await expect(page.locator('text=Transakcja została dokonana')).toBeVisible();
}

export async function expectFailedState(page: Page) {
  await expect(page.locator('text=Transakcja nie została dokonana')).toBeVisible();
}

// Test data
export const TEST_TRANSACTION_ID = 'test-session-id';

// Common test scenarios
export const TEST_SCENARIOS = {
  // Loading scenarios
  loading: {
    noId: () => ({ url: '/transaction/status/' }),
    withId: () => ({ url: `/transaction/status/${TEST_TRANSACTION_ID}` })
  },
  
  // Error scenarios
  errors: {
    400: () => ({ status: 400, body: { message: 'Bad Request' } }),
    401: () => ({ status: 401, body: { message: 'Unauthorized' } }),
    404: () => ({ status: 404, body: { message: 'Transaction not found' } }),
    405: () => ({ status: 405, body: { message: 'Method not allowed' } }),
    500: () => ({ status: 500, body: { message: 'Internal Server Error' } }),
    502: () => ({ status: 502, body: { message: 'P24 API error' } }),
    503: () => ({ status: 503, body: { message: 'Service Unavailable' } }),
    504: () => ({ status: 504, body: { message: 'Gateway Timeout' } }),
    unknown: () => ({ status: 418, body: { message: "I'm a teapot" } })
  },
  
  // Success scenarios
  success: {
    completed: () => ({ status: 200, body: { status: 0 } }),
    failed: () => ({ status: 200, body: { status: 1 } })
  },
  
  // Retry scenarios
  retry: {
    pendingThenSuccess: () => [
      { status: 200, body: { status: 1 } },
      { status: 200, body: { status: 0 } }
    ],
    alwaysPending: () => [
      { status: 200, body: { status: 1 } },
      { status: 200, body: { status: 1 } },
      { status: 200, body: { status: 1 } }
    ]
  }
}; 