const {test,expect} = require('@playwright/test');

test('Registration Test',async ({page})=>
    {
        const userName = page.locator('#username');
        const password = page.locator('#password');
        const signinBUtton = page.locator("#signInBtn");
    
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("kishorekumarr105@gmail.com");
        await page.locator("#userPassword").fill("1028Rahul#");
        await page.locator("#login").click();
       //await page.waitForLoadState('networkidle');
       await page.locator(".card-body b").last().waitFor();

        console.log(await page.locator(".card-body b").allTextContents());//to get titles of all products
       
        //await page.pause();
    });

    test('UI components Test',async ({page})=>
        {   
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const userName = page.locator('#username');
            const password = page.locator('#password');
            const signinBUtton = page.locator("#signInBtn");
            const documentLink = page.locator("[href*='documents-request']");

            await userName.fill("rahulshettyacademy");
            await password.fill("learning");
            const dropdown = page.locator("select.form-control");
            await dropdown.selectOption("consult");
            await page.locator("//input[@value='user']/following-sibling::span").click();
            await page.locator("#okayBtn").click();
            await expect(page.locator("//input[@value='user']/following-sibling::span")).toBeChecked();
            await page.locator("#terms").click();
            await expect(page.locator("#terms")).toBeChecked();
            await page.locator("#terms").uncheck();
             expect(await page.locator("#terms").isChecked()).toBeFalsy();//it should be false, as we have unchecked it
             await expect(documentLink).toHaveAttribute("class","blinkingText")//to validate elment with atttribute class and its value is blinkingText
            signinBUtton.click();           
            //await page.pause();
        });

        test('child windows Handling',async ({browser})=>
            {  
                const context = await browser.newContext();
                const page =await context.newPage(); 
                const userName = page.locator('#username');
                await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
                const documentLink = page.locator("[href*='documents-request']");
               
                const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                documentLink.click(),
                ])

               const text = await newPage.locator(".red").nth(0).textContent();
                console.log(text);
                const str = text.split("@");
                const domain = str[1].split(" ")[0];
                console.log(domain);
                await page.locator("#username").fill(dmain);
                //await page.pause();

            });