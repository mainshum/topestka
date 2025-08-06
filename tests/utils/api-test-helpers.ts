import { APIRequestContext } from '@playwright/test';

// Test configuration
export const TEST_CONFIG = {
  baseURL: 'http://localhost:3000',
  apiEndpoint: '/api/transaction/status',
  testUser: {
    email: 'test@example.com',
    id: 'test-user-id'
  }
};

// Mock data
export const MOCK_DATA = {
  transaction: {
    sessionId: 'test-session-id',
    email: 'test@example.com',
    token: 'test-token',
    amount: 5000,
    status: 'pending' as const,
    updatedAt: new Date()
  },
  p24Response: {
    data: {
      status: 'success'
    }
  }
};

// Authentication helpers
export async function createAuthenticatedRequest(request: APIRequestContext, email: string = TEST_CONFIG.testUser.email): Promise<APIRequestContext> {
  // In a real implementation, you would:
  // 1. Create a session token
  // 2. Set up cookies or headers for authentication
  // For now, we'll return the request context as-is
  return request;
}

// Database mocking helpers
export async function mockDatabaseTransaction(request: APIRequestContext, transaction: any): Promise<APIRequestContext> {
  // In a real implementation, you would:
  // 1. Set up a test database
  // 2. Insert the mock transaction
  // 3. Clean up after the test
  return request;
}

export async function mockDatabaseError(request: APIRequestContext): Promise<APIRequestContext> {
  // In a real implementation, you would:
  // 1. Mock the database to throw an error
  // 2. Or use a test database that's configured to fail
  return request;
}

// P24 API mocking helpers
export async function mockP24ApiSuccess(request: APIRequestContext, response: any = MOCK_DATA.p24Response): Promise<APIRequestContext> {
  // In a real implementation, you would:
  // 1. Mock the fetch call to return the specified response
  // 2. Or use a service like MSW (Mock Service Worker)
  return request;
}

export async function mockP24ApiError(request: APIRequestContext, errorType: 'network' | 'invalid_response' | 'server_error' = 'network'): Promise<APIRequestContext> {
  // In a real implementation, you would:
  // 1. Mock the fetch call to throw different types of errors
  // 2. Or use a service like MSW to simulate different error scenarios
  return request;
}

// Test scenario builders
export async function buildTestScenario(
  request: APIRequestContext,
  options: {
    authenticated?: boolean;
    transactionExists?: boolean;
    p24ApiStatus?: 'success' | 'error' | 'network_error';
    databaseStatus?: 'success' | 'error';
  } = {}
): Promise<APIRequestContext> {
  const {
    authenticated = false,
    transactionExists = false,
    p24ApiStatus = 'success',
    databaseStatus = 'success'
  } = options;

  // Build the test scenario based on options
  let modifiedRequest = request;

  if (authenticated) {
    modifiedRequest = await createAuthenticatedRequest(modifiedRequest);
  }

  if (transactionExists && databaseStatus === 'success') {
    modifiedRequest = await mockDatabaseTransaction(modifiedRequest, MOCK_DATA.transaction);
  } else if (databaseStatus === 'error') {
    modifiedRequest = await mockDatabaseError(modifiedRequest);
  }

  if (p24ApiStatus === 'success') {
    modifiedRequest = await mockP24ApiSuccess(modifiedRequest);
  } else if (p24ApiStatus === 'error') {
    modifiedRequest = await mockP24ApiError(modifiedRequest, 'server_error');
  } else if (p24ApiStatus === 'network_error') {
    modifiedRequest = await mockP24ApiError(modifiedRequest, 'network');
  }

  return modifiedRequest;
}

// Expected response helpers
export const EXPECTED_RESPONSES = {
  unauthorized: {
    status: 401,
    message: 'Unauthorized'
  },
  notFound: {
    status: 404,
    message: 'Transaction not found'
  },
  p24Error: {
    status: 502,
    messagePattern: /P24 API/
  },
  databaseError: {
    status: 500,
    messagePattern: /Database|Failed to query database/
  },
  badRequest: {
    status: 400,
    message: 'Bad Request'
  },
  success: {
    status: 200,
    hasStatusProperty: true
  }
};

// Test utilities
export async function expectResponse(response: any, expected: any) {
  const { expect } = await import('@playwright/test');
  
  expect(response.status()).toBe(expected.status);
  
  if (expected.message) {
    const body = await response.json();
    expect(body.message).toBe(expected.message);
  }
  
  if (expected.messagePattern) {
    const body = await response.json();
    expect(body.message).toMatch(expected.messagePattern);
  }
  
  if (expected.hasStatusProperty) {
    const body = await response.json();
    expect(body).toHaveProperty('status');
  }
} 