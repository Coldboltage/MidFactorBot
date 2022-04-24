const mongoose = require("mongoose");

const screenshot = new mongoose.Schema({
  prepareBetSlip: {
    type: String,
    required: true,
  },
  confirmBet: {
    type: String,
  },
  midniteMatchId: {
    type: Number,
    required: true
  },
  factorId: {
    type: Number,
    required: true
  },
  betPlaced : {
    type: Boolean,
    required: false
  }

});

module.exports = mongoose.model("Betscreenshot", screenshot)