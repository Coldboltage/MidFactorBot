// TODO: Create Schema and Model to create
const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema({
  homeTeam: {
    name: { type: String, required: true },
    prediction: {type: Number, required: true},
    odds: {type: Number, required: true },

  },
  awayTeam: {
    name: { type: String, required: true },
    prediction: {type: Number, required: true},
    odds: {type: Number, required: true }

  },
  matchStart: {type: String, required: true},
  factorId: {type: Number, required: true},
  midniteMatchId: {type: Number, required: true},
  upcoming: {type: Boolean, required: true}
});

module.exports = mongoose.model("Match", matchesSchema)
