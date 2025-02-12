const BasePage = require("./BasePage");

class CalculatorPage extends BasePage {
  constructor(page) {
    super(page);
    this.useCalculatorButton = "text=Use Calculator";
    this.startButton = "text=Start";
    this.birthYearInput = "[name='birthYear']";
    this.incomeInput = "[name='assessableIncome']";
    this.propertyDropdown = "[name='propertyOwnership']";
    this.submitButton = "text=Show estimated benefits";
    this.payoutAmount = ".payout-amount";

    this.birthYearDD = ".react-select__input-container";
    this.incomeDD = "#personalInfo\\.assessableIncome-container";
    this.housingDropdown = "[id=\"property\\.typeOfPropertyOfResidence-container\"] div";
    this.propertyOwnershipDD = "#property\\.ownsPropertyOfResidence-container"
  }

  async startCalculator() {
    await this.page.click(this.useCalculatorButton);
    await this.page.click(this.startButton);
  }

  async enterUserDetails({ birthYear, income, multipleProperty, housing, propertyOwnership }) {
    await this.page.locator(this.birthYearDD).click();
    await this.page.getByText(birthYear).click();
    await this.page.locator(this.incomeDD).click();
    await this.page.getByRole('option', { name: income }).click();
    await this.page.locator(this.housingDropdown).nth(3).click();
    await this.page.getByRole('option', { name: housing }).click();
    await this.page.locator(this.propertyOwnershipDD).click();
    await this.page.getByRole('option', { name: propertyOwnership }).click();
    await this.page.locator('.radios-container').scrollIntoViewIfNeeded();
    await this.page.locator(`[value="No"]`).waitFor({ state: 'visible' });
    await this.page.locator('.radios-container').getByLabel('No').click();
    //await this.page.locator('.radios-container > label > input').nth(0).click();
    //await this.page.locator(`[value='${multipleProperty}']`).click({ force: true });
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async getPayout() {
    return await this.page.textContent(this.payoutAmount);
  }
}

module.exports = CalculatorPage;