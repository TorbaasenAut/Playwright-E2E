import {test,expect} from "@playwright/test";

test.describe("Login functionality",()=>{
  test.beforeEach("Go to login page",async({page})=>{
// Launch ur
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
//Assert if the tile is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service")

  //Click on the Make appoint
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();

  })

test("Should login successfully",async({page}) => {
 //Login
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  //Assert a text
  await expect(page.locator("h2")).toContainText("Make Appointment");

});

test("Should prevent login",async({page}) => {
 //Login
  await page.getByLabel("Username").fill("John Smith");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  //Assert a text
   await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
});

});