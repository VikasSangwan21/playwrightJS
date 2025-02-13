module.exports = {
    async validatePayout(dataSet, actual) {
      const expected = calculatePayout(dataSet)
      if (actual.includes(expected)) {
        console.log("Payout validated successfully!"+actual);
      } else {
        throw new Error(`Expected payout ${expected} but got ${actual}`);
      }
    }

 };

 // Private function (not exported)
function calculatePayout(dataSet) {
  let calculatedAmount
  if(dataSet.multipleProperty === "No"){
    switch (dataSet.income) {
      case "$22,000 and below or No income":
        return "$600"
        break;
      case "Between $22,001 and $34,000":
        return "$600"
        break;
      case "Between $34,001 and $100,000":
        return "$350"
        break;
      case "Above $100,000":
        return "$100"
        break;
      default:
        return "$00"
        break;
    }
  }else{
    switch (dataSet.income) {
      case "$22,000 and below or No income":
        return "$100"
        break;
      case "Between $22,001 and $34,000":
        return "$100"
        break;
      case "Between $34,001 and $100,000":
        return "$100"
        break;
      case "Above $100,000":
        return "$100"
        break;
      default:
        return "$00"
        break;
    }
  }
  return "$00"
}
 