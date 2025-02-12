module.exports = {
    async validatePayout(expected, actual) {
      if (actual.includes(expected)) {
        console.log("Payout validated successfully!");
      } else {
        throw new Error(`Expected payout ${expected} but got ${actual}`);
      }
    }
  };