import { test, expect } from "@playwright/test";
 
test.beforeAll("Beforeall hook",() => {
  console.log('>> before all: File scoop');  //Run once pr worker
});

test.beforeEach("BeforeEach",() => {
  console.log('>> before each: File scoop');  //Run once pr test. 6 times
});

test.describe("Test suite 1",() => {

test.beforeAll("Beforeall hook",() => {
  console.log('>> before all: File scoop suite1');  //Run once pr worker
});

test.beforeEach("BeforeEach",() => {
  console.log('>> before each: File scoop suite1');  //Run once pr test. 6 times
});

test("Test one", async({ page })=> {

});

test("Test two", async({ page })=> {

});
test("Test three", async({ page })=> {

});

});

test.describe("Test suite 2",() => {

test.beforeAll("Beforeall hook",() => {
  console.log('>> before all: File scoop suit 2');  //Run once pr worker
});

test.beforeEach("BeforeEach",() => {
  console.log('>> before each: File scoop suit2');  //Run once pr test. 6 times
});

test("Test one", async({ page })=> {

});

test("Test two", async({ page })=> {

});
test("Test three", async({ page })=> {

});

});