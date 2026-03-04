/**
 * Cookie utilities for persisting discount tokens across login flow
 */

const DISCOUNT_COOKIE_NAME = 'discount_token';
const DISCOUNT_COOKIE_MAX_AGE = 60 * 60 * 48; // 48 hours in seconds

/**
 * Client-side: Set discount token in cookie
 */
export function setDiscountCookie(token: string): void {
  if (typeof window === 'undefined') return;

  const secure = window.location.protocol === 'https:';
  const cookieValue = `${DISCOUNT_COOKIE_NAME}=${encodeURIComponent(token)}; max-age=${DISCOUNT_COOKIE_MAX_AGE}; path=/; SameSite=Lax${secure ? '; Secure' : ''}`;
  document.cookie = cookieValue;
}

/**
 * Client-side: Get discount token from cookie
 */
export function getDiscountCookie(): string | null {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === DISCOUNT_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * Client-side: Clear discount token cookie
 */
export function clearDiscountCookie(): void {
  if (typeof window === 'undefined') return;

  document.cookie = `${DISCOUNT_COOKIE_NAME}=; max-age=0; path=/`;
}

/**
 * Server-side: Get discount token from cookie string or request
 */
export function getDiscountCookieFromHeader(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === DISCOUNT_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
