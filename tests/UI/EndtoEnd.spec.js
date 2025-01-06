const {test,expect} = require('@playwright/test');

test('Add Product to Cart Test',async ({page})=>
    {
        const userName = page.locator('#username');
        const password = page.locator('#password');
        const signinBUtton = page.locator("#signInBtn");
        const products = page.locator(".card-body");
        const productName = "ZARA COAT 3";
        const email ="kishorekumarr105@gmail.com";
    
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill(email);
        await page.locator("#userPassword").fill("1028Rahul#");
        await page.locator("#login").click();
       //await page.waitForLoadState('networkidle');
       await page.locator(".card-body b").last().waitFor();

        console.log(await page.locator(".card-body b").allTextContents());//to get titles of all products

        const count = await products.count();
        for(let i =0;i<count;i++)
        {
           if( await products.nth(i).locator("b").textContent()===productName)
           {
               await products.nth(i).locator("text= Add To Cart").click();
                break;
           }
        }
        await page.locator("[routerlink *='cart']").click();
       await page.locator("div li").first().waitFor();//wait until items added to cart are shown in cart page
        const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();// is visible does not support autowait, hecne we added above statement
        await expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator("[placeholder='Select Country']").pressSequentially("ind");//when we enter ind in select country, we get dynamic dropdowm options
        const dropdown = page.locator("section.ta-results");//get the page locator for the list of dynamic drop down options
        await dropdown.waitFor();//wait until the list of options is shown
        const options = await dropdown.locator("button").count();
        for(let i=0;i<options;i++)
        {
           const text = await dropdown.locator("button").nth(i).textContent();
            if(text===" India") 
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

       await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
       await page.locator(".action__submit").click();
       await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
       const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
       await console.log(orderId);
       await page.locator("button[routerlink*='myorders']").click();//click on orders, to verify your order id
       await page.locator("tbody").waitFor();//wait until table of all orders get displayed
       const rows = await page.locator("tbody tr");//get all the rows of orders table
       for(let i=0;i<await rows.count();i++)//iterate through each row, and verify your order ID
       {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)) //if order ID is equal to your order ID, click on view button
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
       }
       
       const finalOrderId = await page.locator("//small[text()='Order Id']/following-sibling::div").textContent();//fetch order ID shown in order summary page
       await expect(orderId.includes(finalOrderId)).toBeTruthy();//Verify order ID in order summary page.
       await page.pause();
    });
