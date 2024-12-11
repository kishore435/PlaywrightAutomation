const{test,expect} = require ("@playwright/test");

test("Calender Validation",async ({page}) => 
{
   const day="15";
   const month="6";
   const year="2027";
   const date = [month,day,year];

   await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
   await page.locator(".react-date-picker__inputGroup").click();
   await page.locator(".react-calendar__navigation__label__labelText").click();
   await page.locator(".react-calendar__navigation__label__labelText").click();
   await page.getByText(year).click();
   await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
   await page.locator("//abbr[text()='"+day+"']").click();
   const inputs = await page.locator(".react-date-picker__inputGroup input");

   for(let index=0; index<inputs.length; index++)
   {
        const value = await inputs[index].getAttribute("value");

        await expect(value).toEqual(date[index]);
   }

   });