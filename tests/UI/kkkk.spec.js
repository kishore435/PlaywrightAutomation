const {test,expect} = require('@playwright/test');

test('Registration Test',async ({page})=>
    {
       
    
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //     await page.locator("#dropdown-class-example").selectOption("option2");
    //     await page.waitForTimeout(3000);
    //     const name = page.locator("//input[@placeholder='Enter Your Name']")
    //     await page.locator("#checkBoxOption1").click();
    //    await name.fill("sachin");
    //    await expect(name).toHaveValue('sachin');
    //    const prices = await page.locator("//table[@class='table-display']//tr/td[3]").allTextContents();
    //    console.log(prices);
      const text =  await page.locator(".blinkingText").first().textContent();
      await expect(text).toContain("Free Access to InterviewQues/ResumeAssistance/Material");
      console.log(text);
    });