const {test,expect} = require('@playwright/test');

test.only('Add Product to Cart Test',async ({page})=>
    {
        const userName = page.locator('#username');
        const password = page.locator('#password');
        const signinBUtton = page.locator("#signInBtn");
        const products = page.locator(".card-body");
        const productName = "ZARA COAT 3";
        const email ="kishorekumarr105@gmail.com";
    
        await page.goto("https://rahulshettyacademy.com/client");
        await page.getByPlaceholder("email@example.com").fill(email);
        await page.getByPlaceholder("enter your passsword").fill("1028Rahul#");
        await page.getByRole('button',{name:"Login"}).click();
       
       //await page.waitForLoadState('networkidle');
       await page.locator(".card-body b").last().waitFor();

        console.log(await page.locator(".card-body b").allTextContents());//to get titles of all products

        await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:'Add to Cart'}).click();
        
        await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();


       await page.locator("div li").first().waitFor();//wait until items added to cart are shown in cart page
        
        await expect(page.getByText("ZARA COAT 3")).toBeVisible();

        await page.getByRole("button",{name:"Checkout"}).click();


        await page.getByPlaceholder("Select Country").pressSequentially("ind");//when we enter ind in select country, we get dynamic dropdowm options
        
        await page.getByRole("button",{name:"India"}).nth(1).click(); 


       await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
       await page.getByText("PLACE ORDER").click();

        await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
      
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
