const {test,expect} = require('@playwright/test');

test('Browser context First Playwright Test',async ({browser})=>
{
    const context = await browser.newContext();
    const page =await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signinBUtton = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    /* await page.locator('#username').fill("kishorekumarr105@gmail.com");
    await page.locator('#password').fill("1028Rahul#");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); */

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signinBUtton.click();

     //console.log(await page.locator(".card-body a").first().textContent());
     console.log(await page.locator(".card-body a").nth(0).textContent());
     console.log(await page.locator(".card-body a").allTextContents());



   // await page.pause();
});

test('page Playwright Test',async ({page})=>
    {
        await page.goto('/');
        //get tile - assertion
       console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });