const {test,expect} = require('@playwright/test');
    class LoginPage{

        constructor(page)
        {
            this.page = page;
            this.userName = page.locator("#userEmail");
            this.password = page.locator("#userPassword");
            this.signInbutton = page.locator("#login");
        }


       async  goTo()
        {
            await this.page.goto("https://rahulshettyacademy.com/client");
        }

        async validLogin(userName,password)
    {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    }

   module.exports = {LoginPage}



    