import { test } from "../fixtures/fixtures.js";
import { expect } from '@playwright/test';
const CalculatorPage = require("../pages/CalculatorPage.js");
const testData = require("../testData/testData.js");
const helpers = require("../utils/helpers.js");

// NEGETIVE TESTS
test.describe('Negative Tests', () => {
  // Verify Cash Assurance Payout is not displayed for age <20
  test("Verify Cash Assurance Payout is not displayed for age <20", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.belowAgeLimit);
    await calculatorPage.submitForm();
    const payout = await calculatorPage.getCashAssurancePayoutElement();
    await expect(payout).not.toBeVisible();

  });

  //Verify Errors for Incomplete Inputs 
  test("Verify Errors for Incomplete Inputs", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    // Skip entering data in calculator form
    await calculatorPage.submitForm();
    // Verify Error messages are displayed for all fields
    const errorMessages = calculatorPage.verfyErrorMessages(4); 
  });

  // Verify Cash Assurance Payout is not displayed for age <20 with ADDITIONAL FAMILY MEMBER
  test("Verify Cash Assurance Payout is not displayed for age <20 with additional family member", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.belowAgeLimit);
    await calculatorPage.addFamilyMember(testData.familyMember1);
    await calculatorPage.submitForm();
    const payout = await calculatorPage.getCashAssurancePayoutElement();
    await expect(payout).not.toBeVisible();

  });

  //Verify unable to submit form without year of birth
  test("Verify unable to submit form without year of birth", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    // Skip entering Year of Birth in calculator form
    await calculatorPage.enterUserDetails(testData.missingYOB);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for YOB
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

    //Verify unable to submit form without AI Input
    test("Verify unable to submit form without Annual Income for age> 20 user", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    // Skip entering AI in calculator form
    await calculatorPage.enterUserDetails(testData.missingAI);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for AI
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

  //Verify unable to submit form without property ownership
  test("Verify unable to submit form without property ownership", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    // Skip entering property ownership in calculator form
    await calculatorPage.enterUserDetails(testData.missingPropertyOwnership);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for property ownership
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

  //Verify unable to submit form without HOUSING TYPE input
  test("Verify unable to submit form without housing time", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    // Skip entering HOUSING TYPE in calculator form
    await calculatorPage.enterUserDetails(testData.missingHousing);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for HOUSING TYPE
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

  //Verify unable to submit form without multiple properties details
  test("Verify unable to submit form without multiple properties details", async ({ calculatorPage }) => {
      await calculatorPage.startCalculator();
      // Skip entering multiple properties in calculator form
      await calculatorPage.enterUserDetails(testData.missingMultipleOwnership);
      await calculatorPage.submitForm();
      // Verify Error messages is displayed for multiple properties
      const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

  //Verify unable to submit form without YOB household member
  test("Verify unable to submit form without YOB household member", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.belowAgeLimit);
    // add family member without year of birth
    await calculatorPage.addFamilyMember(testData.missingYOB);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for YOB
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

  //Verify unable to submit form without AI household member
  test("Verify unable to submit form without AI household member", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.belowAgeLimit);
    // add family member without AI
    await calculatorPage.addFamilyMember(testData.missingAI);
    await calculatorPage.submitForm();
    // Verify Error messages is displayed for AI
    const errorMessages = calculatorPage.verfyErrorMessages(1); 
  });

});


