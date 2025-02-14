const BasePage = require("./BasePage");

import { expect } from '@playwright/test';

class CalculatorPage extends BasePage {
  constructor(page) {
    super(page);
    this.useCalculatorButton = "text=Use Calculator";
    this.startButton = "text=Start";
    this.birthYearInput = "[name='birthYear']";
    this.incomeInput = "[name='assessableIncome']";
    this.propertyDropdown = "[name='propertyOwnership']";
    this.submitButton = "text=Show estimated benefits";
    this.cashAssurancePackagePayoutAmount = "(//span[text()='Cash - Assurance Package']/parent::a/parent::div/parent::div/parent::div)[1]/span";
    this.cashAssurancePackagePayoutAmount2026 = '[id="2026-You-payout"]';

    this.birthYearDD = ".react-select__input-container";
    this.incomeDD = "#personalInfo\\.assessableIncome-container";
    this.housingDropdown = "[id=\"property\\.typeOfPropertyOfResidence-container\"] div";
    this.propertyOwnershipDD = "#property\\.ownsPropertyOfResidence-container"

    this.errorMessage = 'text=This is a required field.'
  }

  async startCalculator() {
    await this.page.click(this.useCalculatorButton);
    await this.page.click(this.startButton);
  }

  async enterUserDetails({ birthYear, income, multipleProperty, housing, propertyOwnership }) {
    

    await this.page.locator(this.birthYearDD).click();
    await this.page.getByText(birthYear).click();
    if(income !== ""){
      await this.page.locator(this.incomeDD).click();
      await this.page.getByRole('option', { name: income }).click();
    }
    await this.page.locator(this.housingDropdown).nth(3).click();
    await this.page.getByRole('option', { name: housing }).click();
    await this.page.locator(this.propertyOwnershipDD).click();
    await this.page.getByRole('option', { name: propertyOwnership }).click();
    await this.page.locator('.radios-container').scrollIntoViewIfNeeded();
    if(multipleProperty === "No"){
      await this.page.getByRole('group', { name: 'Do you own more than 1' }).locator('div').nth(2).click();
    }else{
      await this.page.getByRole('group', { name: 'Do you own more than 1' }).locator('div').nth(4).click();
    }
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }


  async getCashAssurancePayout(year) {
    if(year === '2025'){
      return await this.page.textContent(this.cashAssurancePackagePayoutAmount);
    }else {
      return await this.page.textContent(this.cashAssurancePackagePayoutAmount2026);
    }
  }

  async getCashAssurancePayoutElement() {
    return await this.page.locator(this.cashAssurancePackagePayoutAmount);
  }

  async verfyErrorMessages() {
    const errorMessages = await this.page.locator('text=This is a required field.');
      //const errorMessages = calculatorPage.getErrorMessages(); 
    
      // Verify that exactly 4 elements are found
      await expect(errorMessages).toHaveCount(4);
    
      // Verify all 4 elements are visible
      for (let i = 0; i < 4; i++) {
          await expect(errorMessages.nth(i)).toBeVisible();
    }
  }

  async selectYear(year) {
    await this.page.locator(`//button/span[text()='${year}']`).click();
  }

}

module.exports = CalculatorPage;