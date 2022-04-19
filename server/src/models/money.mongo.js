const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema({
  amountAvailable: {
    type: Number,
    required: true,
  },
  isMain: {
    type: Boolean,
  }
});

module.exports = mongoose.model("Money", moneySchema)