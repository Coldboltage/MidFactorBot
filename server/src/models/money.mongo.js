const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
  amountAvailable: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Money", moneySchema)