const MoneyDatabase = require("./money.mongo");

const updateMoney = async (moneyAmount) => {
  const amountMoneyValidation = await MoneyDatabase.findOne({ isMain: true });
  console.log(amountMoneyValidation);
  if (amountMoneyValidation) {
    console.log(amountMoneyValidation);
    amountMoneyValidation.amountAvailable = +moneyAmount;
    await amountMoneyValidation.save();
    console.log("Money updated");
  } else {
    // Create document for amountAvailable
    console.log("adding object")
    const moneyObject = {
      isMain: true,
      amountAvailable: +moneyAmount,
    };
    await MoneyDatabase.create(moneyObject);
    console.log("Money added");
  }
};

const checkMoney = async () => {
  const amountMoney = await MoneyDatabase.findOne({ main: true });
  console.log(amountMoney);
  return +amountMoney.amountAvailable;
};

module.exports = {
  updateMoney,
  checkMoney,
};
