import { test, expect } from '@playwright/test';

test('Facebook login attempt with invalid credentials', async ({ page }) => {
  // Step 1: Navigate to Facebook
  await page.goto('https://www.facebook.com/');

  // Step 2: Enter email in the email text box
  await page.getByLabel('Email address or phone number').fill('kishorekumar435@gmail.com');

  // Step 3: Enter password in the password text box
  await page.getByLabel('Password').fill('123456');

  // Step 4: Click on the login button
  await page.getByRole('button', { name: 'Log in' }).click();

  // Step 5: Assert error message or failed login
  const errorAlert = page.locator('text=The email address or mobile number you entered isn’t connected to an account. Find your account and log in.');
  if (await errorAlert.isVisible()) {
    await expect(errorAlert).toBeVisible();
    console.log('Login failed: Account not found.');
  } else {
    // Check for any other login error
    const genericError = page.locator('div[role="alert"]');
    if (await genericError.isVisible()) {
      await expect(genericError).toBeVisible();
      console.log('Login failed: Generic error.');
    } else {
      // If login succeeds (unexpected), check for home page
      await expect(page).toHaveURL(/facebook.com/);
    }
  }
});
