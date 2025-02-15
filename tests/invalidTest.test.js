import { test } from "../fixtures/fixtures.js";
import { expect } from '@playwright/test';
const CalculatorPage = require("../pages/CalculatorPage.js");
const testData = require("../testData/testData.js");
const helpers = require("../utils/helpers.js");

// Failing Test to demonstrate screenshots and video recording for failing test cases
test("Test example for failing tests", async ({ calculatorPage }) => {
  await calculatorPage.startCalculator();
  throw new Error(`Error to show failing test scenario Screeshot and Video`);

});


