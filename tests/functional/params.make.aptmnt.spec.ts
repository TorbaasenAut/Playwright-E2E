import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

const makeAppTestData = TestData.makeAppointmentTestData(); //return 3 objects of test data
for (const apptData of makeAppTestData){
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
  test(`${apptData.testId}:test should make an appointment with non-default values`, async ({page }) => {
    //Dropdown
     await page
      .getByLabel("Facility")
      .selectOption(apptData.facility);
    await page.getByText("Apply for hospital readmission").click();
    //Radio button
    await page.getByText(apptData.hcp).click();
    //Date field
    await page.getByRole("textbox",{name:"Visit Date (Required)"}).click();
    await page.getByRole("textbox",{name:"Visit Date (Required)"}).pressSequentially(apptData.visitDt);
    //await page.getByRole("textbox",{name:"Visit Date (Required)"}).fill("05/10/2027");
    await page.getByRole("textbox",{name:"Visit Date (Required)"}).press("Enter");

       //Multiline commnts input box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a multiline\ncomment");
    await page.getByRole("button",{name:"Book Appointment"}).click();
 
    //Assertion
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await page.getByRole("link", { name: "Go to Homepage" }).click();
  });
});
}
