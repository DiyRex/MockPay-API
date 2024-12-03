const isCardValid = (year, month) => {
  const currentYear = new Date().getFullYear();
  if (year < 100) {
    year = 2000 + parseInt(year, 10);
  }

  if (year > currentYear + 100) {
    console.log(`Expiration year (${year}) seems unusually far in the future.`);
    return false; 
  }
  const formattedMonth = month.toString().padStart(2, '0');
  const expirationDate = new Date(year, formattedMonth - 1, 1);
  expirationDate.setMonth(expirationDate.getMonth() + 1, 0); 
  
  const todayDate = new Date();
  return expirationDate >= todayDate;
};

module.exports = { isCardValid };
