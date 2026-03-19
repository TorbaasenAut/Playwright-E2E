import { test, expect } from '@playwright/test'

test("Should load a webpage with correct title ", async({page})=>{
// Go to home page
await page.goto("https://katalon-demo-cura.herokuapp.com/")
//Assert if the tile is correct
await expect(page).toHaveTitle("CURA Healtcare Service")
//Assert header text
await expect(page.locator("//h1")).toHaveText("CURA Healtcare Service")
})

test.only("Should demo locator",async({page})=>{
    //Steps
 await page.goto("https://katalon-demo-cura.herokuapp.com/")

  //Click on the Make appoint
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" })
  console.log(`>>The type of locator: ${typeof makeAppmtBtn}, The value of the locator is: ${JSON.stringify(makeAppmtBtn)}`);
   //makeAppmtBtn.click();
  //await expect(page.getByText("Please login to make")).toBeVisible();

});
test.only("Should demo config file",async({page},testInfo)=>{
 
  console.log(`>>Config at run time: ${JSON.stringify(testInfo.config)}`);
});
test.only("Should demo BROWSERNAME",async({page},BROWSERNAME)=>{
 
  console.log(`>>Config at run time: ${BROWSERNAME}`);
});