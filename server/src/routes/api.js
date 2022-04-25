const express = require("express")
const matchesRouter = require("./matches/matches.router")

const api = express.Router();

api.use("/matches", matchesRouter)

module.exports = api