const { test,request } = require('@playwright/test');

test('New API Request',async () => {
  // Create a new APIRequestContext
  const apiContext = await request.newContext();

  // Send a GET request to the API endpoint
  const response = await apiContext.get('https://reqres.in/api/users?page=2');

  // Check if the response is OK (status 200)
  if (response.ok()) {
    // Parse the JSON data from the response
    const responseData = await response.json();   
    
    console.log(responseData.total);
    console.log(responseData.total_pages);
    
  } else {
    console.error(`Failed to fetch API. Status: ${response.status()}`);
  }

  // Dispose of the APIRequestContext
  await apiContext.dispose();
});
