const { test, expect } = require('@playwright/test');

test('Validate custom API response', async ({ request }) => {

  const response = await request.get('http://localhost:3000/api/user');

  // Status assertion
  expect(response.status()).toBe(200);

  // Body assertion
  const body = await response.json();
  console.log(body);

  expect(body.id).toBe(1);
  expect(body.name).toBe('Sachin');
  expect(body.role).toBe('Tester');
  expect(body.active).toBe(true);
});
