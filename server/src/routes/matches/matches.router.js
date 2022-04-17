const express = require("express")

// Controllers to be sent down
const {httpGetAllMatches} = require("./matches.controller")

const matchesRouter = express.Router()

matchesRouter.get("/matches", httpGetAllMatches)

module.exports = matchesRouter;