const { test, expect } = require('@playwright/test');

const { POManager } = require('../../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify((require("../../utils/PlaceOrderTestData.json"))));

for(const data of dataSet)
{
test(`Add Product to Cart Test for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);
    /* const productName = "ZARA COAT 3";
    const userName = "kishorekumarr105@gmail.com";
    const password = "1028Rahul#"; */

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();

    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);

    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})};
