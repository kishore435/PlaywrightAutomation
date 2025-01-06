const {test,expect} = require('@playwright/test');


test("@smoke Popup Validations", async({page})=>
{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 /* await page.goto("https://www.google.com/");
 await page.goBack();//navigate back
 await page.goForward(); */ //navigate forward

 await expect(page.locator("#displayed-text")).toBeVisible();//to check elment is visible or not
 await page.locator("#hide-textbox").click();
 await expect(page.locator("#displayed-text")).toBeHidden();//checking element is hidden or not


});


test("@smoke Handling pop-up", async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /* await page.locator("#confirmbtn").click();
  
    await page.on('dialog',dialog => dialog.dismiss());
    await page .pause();
    await page.locator("#mousehover").hover();
 */

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("[href='lifetime-access']:visible").click();//this locator returns two elements, one is invisible, want to switch the element which is visble
    const text = await framesPage.locator(".text h2").textContent();
    console.log (text.split(' ')[1]);

   

});