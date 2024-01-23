
const isCardValid = (month, year) => {
  var expirationDate = new Date(`${year}-${month}-01`);
  expirationDate.setMonth(expirationDate.getMonth() + 1, 0);
  var todayDate = new Date();
  return expirationDate - todayDate > 0 ? true : false;
};

module.exports = {isCardValid};

