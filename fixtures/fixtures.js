import { test as base } from "@playwright/test";
import CalculatorPage from "../pages/CalculatorPage.js";
import {
	baseUrl
} from '../config'

export const test = base.extend({
  calculatorPage: async ({ page }, use) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.navigate(baseUrl);
    await use(calculatorPage);
  }
});
