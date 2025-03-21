import { test } from "../fixtures/fixtures.js";
import { expect } from '@playwright/test';
const CalculatorPage = require("../pages/CalculatorPage");
const testData = require("../testData/testData");
const helpers = require("../utils/helpers");


test.describe('Positive Tests', () => {
  //Age ≥ 20, Owns 0-1 property, Income ≤ $22,000, userset1
  test("Verify payout for user with 0-1 property and income ≤ $22,000", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.validUser1);
    await calculatorPage.submitForm();
    const payout = await calculatorPage.getCashAssurancePayout('2025');
    await helpers.validatePayout(testData.validUser1, '2025', payout); 
    await calculatorPage.selectYear('2026');
    const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
    await helpers.validatePayout(testData.validUser1, '2026', payout2026); 
  });

  //Age ≥ 20, Owns 0-1 property, Income $22,001 - $34,000
  test("Verify payout for user with 0-1 property and income  $22,001 - $34,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser2);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser2, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser2, '2026', payout2026);
  });

  //Age ≥ 20, Owns 0-1 property, Income $34,001 - $100,000
  test("Verify payout for user with 0-1 property and income $34,001 - $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser3);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser3, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser3, '2026', payout2026);
  });

  //Age ≥ 20, Owns 0-1 property, Income > $100,000
  test("Verify payout for user with 0-1 property and income > $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser4);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser4, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser4, '2026', payout2026);
  });

  //Age ≥ 20, Owns more than 1 property, Income ≤ $22,000
  test("Verify payout for user with >1 property and income ≤ $22,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser5);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser5, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser5, '2026', payout2026);
  });


  //Age ≥ 20, Owns more than 1 property, Income $22,001 - $34,000
  test("Verify payout for user with more than 1 property and income $22,001 - $34,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser6);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser6, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser6, '2026', payout2026);
  });

  //Age ≥ 20, Owns more than 1 property, Income $34,001 - $100,000
  test("Verify payout for user with more than 1 property, Income $34,001 - $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser7);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser7, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser7, '2026', payout2026);
  });

  //Age ≥ 20, Owns more than 1 property, Income > $100,000
  test("Verify payout for user with >1 property and income > $100,000", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  await calculatorPage.enterUserDetails(testData.validUser8);
  await calculatorPage.submitForm();
  const payout = await calculatorPage.getCashAssurancePayout('2025');
  await helpers.validatePayout(testData.validUser8, '2025', payout); 
  await calculatorPage.selectYear('2026');
  const payout2026 = await calculatorPage.getCashAssurancePayout('2026');
  await helpers.validatePayout(testData.validUser8, '2026', payout2026);
  });

  //Verify user is able to delete Family Member
  test("Verify user is able to delete Family Member", async ({ calculatorPage }) => {
    await calculatorPage.startCalculator();
    await calculatorPage.enterUserDetails(testData.belowAgeLimit);
    await calculatorPage.addFamilyMember(testData.familyMember1);
    await calculatorPage.removeFamilyMember(testData.familyMember1);
    const familyMemberDetails = await calculatorPage.getfamilyMemberAgeDD();
    await expect(familyMemberDetails).not.toBeVisible();

  });

});


