module.exports = {
    async validatePayout(dataSet, year, actual) {
      const expected = calculatePayout(dataSet, year)
      if (actual.includes(expected)) {
        console.log("Payout validated successfully!"+actual);
      } else {
        throw new Error(`Expected payout ${expected} but got ${actual}`);
      }
    }

 };

const payoutData = require('../testData/payoutData.json');
function calculatePayout(dataSet, year) {
  return payoutData[dataSet.multipleProperty]?.[dataSet.income]?.[year] || "No data available";
}

 