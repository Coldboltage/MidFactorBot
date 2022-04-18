const MoneyDatabase = require("./money.mongo")

const updateMoney = async (moneyAmount) => {
  const amountMoneyValidation = await MoneyDatabase.findOne({amountAvailable})
  if (amountMoneyValidation) {
    amountMoneyValidation.amountAvailable = +moneyAmount;
    await amountMoneyValidation.save()
    console.log("Money added")
  } else {
    // Create document for amountAvailable
    const addMoneyDocument = await MoneyDatabase.create({amountAvailable: +moneyAmount})
    await addMoneyDocument.save()
    console.log("Money added")
  }
}