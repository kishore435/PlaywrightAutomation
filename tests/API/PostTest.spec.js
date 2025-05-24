const { test,request, expect  } = require('@playwright/test');

test('Post API Request',async ({request}) => {
   const response = await request.post('https://reqres.in/api/users',{
  data: {
      name: 'kishorekumar',
      job: 'QA'
    },
    headers: {
      'x-api-key': 'reqres-free-v1',
      
    }});

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
  
  expect(responseBody).toHaveProperty('id');
  expect(responseBody.job).toBe('QA');
  console.log(responseBody.job);
  console.log(responseBody.name);
});