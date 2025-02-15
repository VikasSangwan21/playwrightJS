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

    // Family Member
    this.birthYearFamilyMemberDD = '[id="member\\.0\\.yearOfBirth-container"] svg'
    this.incomFamilyMemberDD = '[id="member\\.0\\.assessableIncome-container"]';
    this.addFamilyMemberButton = 'Add household member'
    this.removeFamilyMemberButton = 'Remove'

  }

  async startCalculator() {
    await this.page.click(this.useCalculatorButton);
    await this.page.click(this.startButton);
  }

  async enterUserDetails({ birthYear, income, multipleProperty, housing, propertyOwnership }) {
    // SKIP ENTERING DETAILS IF MISSING IN TEST DATA
    if(birthYear !== ""){
      await this.page.locator(this.birthYearDD).click();
      await this.page.getByText(birthYear).click();
      if(income !== ""){
        await this.page.locator(this.incomeDD).click();
        await this.page.getByRole('option', { name: income }).click();
      }
    }
   
    if(housing !== ""){
      await this.page.locator(this.housingDropdown).nth(3).click();
      await this.page.getByRole('option', { name: housing }).click();
    }
    if(propertyOwnership !== ""){
      await this.page.locator(this.propertyOwnershipDD).click();
      await this.page.getByRole('option', { name: propertyOwnership }).click();
    }
    if(multipleProperty !== ""){
      await this.page.locator('.radios-container').scrollIntoViewIfNeeded();
      if(multipleProperty === "No"){
        await this.page.getByRole('group', { name: 'Do you own more than 1' }).locator('div').nth(2).click();
      }else{
        await this.page.getByRole('group', { name: 'Do you own more than 1' }).locator('div').nth(4).click();
      }
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

  async verfyErrorMessages(count) {
    const errorMessages = await this.page.locator('text=This is a required field.');
    
    // Verify that exactly 4 elements are found
    await expect(errorMessages).toHaveCount(count);
  
    // Verify all 4 elements are visible
    for (let i = 0; i < count; i++) {
        await expect(errorMessages.nth(i)).toBeVisible();
    }
  }

  async selectYear(year) {
    await this.page.locator(`//button/span[text()='${year}']`).click();
  }

  async addFamilyMember({ birthYear, income, multipleProperty, housing, propertyOwnership }) {
    await this.page.getByRole('button', { name: this.addFamilyMemberButton }).click();
    if(birthYear !== ""){
      await this.page.locator(this.birthYearFamilyMemberDD).click();
      await this.page.getByText(birthYear).click();
      if(income !== ""){
        await this.page.locator(this.incomFamilyMemberDD).click();
        await this.page.getByRole('option', { name: income }).click();
      }
    }
  }

  async removeFamilyMember() {
    await this.page.getByRole('button', { name: this.removeFamilyMemberButton }).click();
  }

  async getfamilyMemberAgeDD() {
    return await this.page.locator(this.birthYearFamilyMemberDD);
  }


}




module.exports = CalculatorPage;