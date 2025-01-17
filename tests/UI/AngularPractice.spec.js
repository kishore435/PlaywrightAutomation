const {test,expect} = require('@playwright/test');

test('playwright special locators',async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/angularpractice/");
        await page.getByLabel("Check me out if you Love IceCreams!").click();
        await page.getByLabel("Employed").check();
        await page.getByLabel("Gender").selectOption("Female");
        await page.getByPlaceholder("Password").fill("kishore");
        await page.getByRole('button',{name:'Submit'}).click();
        await expect(page.getByText(" The Form has been submitted successfully!.").isVisible()).toBeTruthy();
        await page.getByRole('link',{name:'Shop'}).click();
        await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
        await page.goto("kishorekumar");
        await page.goto("feature_new again")
        await page.pause();

    });