
 import test, { expect } from "playwright/test";
 
 test.describe("Make Appointment", () => {
   test.beforeEach("Login with valid creds", async ({ page }) => {
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
 
     //Assert a text
     await expect(page.locator("h2")).toContainText("Make Appointment");
   });
 
   //Test goes here
   test("test should make an appointment with non-default values", async ({ page }) => {
     //Dropdown
     await page
       .getByLabel("Facility")
       .selectOption("Hongkong CURA Healthcare Center");
     await page.getByText("Apply for hospital readmission").click();
     //Radio button
     await page.getByText("Medicaid").click();
     //Date field
     //await page.getByRole("textbox",{name:"Visit Date(Required)"}).click();
     //await expect(searchInput1).toBeVisible();
     //await searchInput1.fill('05/10/2027');
     await page.getByPlaceholder("dd/mm/yyyy").fill("05/10/2027");
     await page.getByPlaceholder("dd/mm/yyyy").press("Enter");
 
     //Multiline commnts input box
     await page.getByPlaceholder("Comment").click();
     await page
       .getByPlaceholder("Comment")
       .fill("This is a multiline\ncomment");
     await page.getByRole("button", { name: "Book Appointment" }).click();
 
     //Assertion
     await expect(page.locator("h2")).toContainText("Appointment Confirmation");
     await page.getByRole("link", { name: "Go to Homepage" }).click();
   });
 });
 