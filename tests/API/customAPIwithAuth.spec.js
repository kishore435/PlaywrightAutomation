const { test, expect } = require('@playwright/test');

test('Validate protected API with authorization', async ({ request }) => {
  const response = await request.get(
    'http://localhost:3000/api/protected/user',
    {
      headers: {
        Authorization: 'Bearer my-secret-token'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
  expect(body.authorized).toBe(true);
  expect(body.name).toBe('Sachin');
});
