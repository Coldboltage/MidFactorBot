// TODO: Create Schema and Model to create
const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema({
  homeTeam: {
    name: { type: String, required: true },
    prediction: {type: Number, required: true},
  },
  awayTeam: {
    name: { type: String, required: true },
    prediction: {type: Number, required: true},
  },
  matchStart: {type: Number, required: true}
});
