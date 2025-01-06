    const ExcelJs = require('exceljs');
    const { test, expect } = require('@playwright/test');
    async function exceltest(searchText, replaceText, change, excelPath) {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(excelPath)
        const worksheet = workbook.getWorksheet('Sheet1');
        const output = await readExcel(worksheet, searchText);
        const cell = worksheet.getCell(output.row, output.column + change.colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(excelPath);
    }

    async function readExcel(worksheet, searchText) {
        let output = { row: -1, column: -1 };
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNumber;
                    output.column = colNumber
                } 
            })
        })
        return output;

    }
    //exceltest("KIWI",350,{rowChange:0,colChange:2},"C://Users//Mobile Programming//Downloads//excelDemo.xlsx");
    test.only('Upload download excel vaidations', async ({ page }) => {

        const textSearch ='Mango';
        const updateValue = 'KISHORE';

        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        // const downloadPromise =  page.waitForEvent('download');
        await page.locator("#downloadButton").click();
        await page.waitForTimeout(3000); // Waits for 3 seconds

       // await downloadPromise;
        await exceltest(textSearch, updateValue, { rowChange: 0, colChange: 3 }, "C://Users//Mobile Programming//Downloads//download.xlsx");
        await page.locator('#fileinput').click();
        await page.locator('#fileinput').setInputFiles("C://Users//Mobile Programming//Downloads//download.xlsx");
        const textLocator = page.getByText(textSearch);//get the locator of the element whose text = 'Mango'
        const desiredRow = await page.getByRole('row').filter({has:textLocator});//find the desired row which has locator of the mango row
        await expect (desiredRow.locator("#cell-5-undefined")).toContainText(updateValue);//in desried row get the text of the element whose locator is cell-5-undefined


        await  page.pause();

    });
