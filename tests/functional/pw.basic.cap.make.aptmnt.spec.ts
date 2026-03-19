import { test, expect } from "@playwright/test";

test.describe("Make Appointment", {annotation:{type:"Story", description:"JIRA-1234"}},() => {
  test.beforeEach("Login with valid creds", async ({ page,browserName }, testInfo) => {
    // Launch ur
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    //Assert if the tile is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //Click on the Make appoint
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

        //Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Add custom screenshot at test scope level
    let fullPageLoginScreenshot = await page.screenshot({fullPage:true});
    await testInfo.attach("login page",{
      body:fullPageLoginScreenshot,
      contentType:"image/png"
    });
    //Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  //Test goes here
  test("test",{tag:"@smoke"},async ({ page,browserName }) => {
    //Dropdown
    test.skip(browserName === "firefox","Open bug ID:1234");
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    //Radio button
    await page.getByText("Medicaid").click();
       //Multiline commnts input box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a multiline\ncomment");
 
    //Date input box
  //   console.log('date exist in DOM',exist);
    const textbox = page.locator('input[placeholder="dd/mm/yyyy"]');
    await page.locator('input[placeholder="dd/mm/yyyy"]').isVisible();
    const isEnabled = await textbox.isEnabled();
    
    await page.locator('input[placeholder="dd/mm/yyyy"]').fill("16/12/2025");
   // await page.getByRole("textbox",{name: "Visit Date(Required)" }).fill("16/12/2025");
 await page.locator('input[placeholder="dd/mm/yyyy"]').isEnabled      
    //Booking button

    await page.getByRole("button", { name: "Book Appointment" }).click();
    //Assertion
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await page.getByRole("link", { name: "Go to Homepage" }).click();
  });
});
