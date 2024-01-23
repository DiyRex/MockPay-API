const types = ["master", "visa", "american", "invalid"];

const getCardType = (cardnum) => {
  const firstNumber = cardnum[0];
  return(
    firstNumber === "2" ? types[0] :
    firstNumber === "5" ? types[0] :
    firstNumber === "4" ? types[1] :
    firstNumber === "3" ? types[2] :
    types[3]
  );
};

module.exports = { getCardType };