import { test, expect } from "../fixtures/fixtures.js";
const CalculatorPage = require("../pages/CalculatorPage");
const testData = require("../testData/testData");
const helpers = require("../utils/helpers");

//Age ≥ 20, Owns 0-1 property, Income ≤ $22,000, userset1
  test("Verify payout for user with 0-1 property and income ≤ $22,000", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.validUser1);
    await calculatorPage.submitForm();
    const payout = await calculatorPage.getCashAssurancePayout();
    await helpers.validatePayout(testData.validUser1, payout); 
});

//Age ≥ 20, Owns 0-1 property, Income $22,001 - $34,000
test("Verify payout for user with 0-1 property and income  $22,001 - $34,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser2);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser2, payout); 
});

//Age ≥ 20, Owns 0-1 property, Income $34,001 - $100,000
test("Verify payout for user with 0-1 property and income $34,001 - $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser3);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser3, payout); 
});

//Age ≥ 20, Owns 0-1 property, Income > $100,000
test("Verify payout for user with 0-1 property and income > $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser4);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser4, payout); 
});

//Age ≥ 20, Owns more than 1 property, Income ≤ $22,000
test("Verify payout for user with >1 property and income ≤ $22,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser5);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser5, payout); 
});


//Age ≥ 20, Owns more than 1 property, Income $22,001 - $34,000
test("Verify payout for user with more than 1 property and income $22,001 - $34,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser6);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser6, payout); 
});

//Age ≥ 20, Owns more than 1 property, Income $34,001 - $100,000
test("Verify payout for user with more than 1 property, Income $34,001 - $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser7);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser7, payout); 
});

//Age ≥ 20, Owns more than 1 property, Income > $100,000
test("Verify payout for user with >1 property and income > $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser8);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout();
  await helpers.validatePayout(testData.validUser8, payout); 
});


