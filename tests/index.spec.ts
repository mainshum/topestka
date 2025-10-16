import { test, expect } from '@playwright/test';

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZW5hIjo0MjB9.h6STrobf3VVTIYD8ykglNCRUsTgXRFQUUVd-I8KF_Rc';

test('should display correct pricing when using valid discount token', async ({ page }) => {
  await page.goto(`http://localhost:3000?discount=${VALID_TOKEN}`);

  // find cena kursu
  const cena = await page.getByLabel('Cena bazowa');
  await expect(cena).toHaveText('4.2');

});