const express = require("express")
// Routers to bring and setup
const matchesRouter = require("./routes/matches/matches.router")

const app = express()

// Create match router
app.use("/", matchesRouter)

module.exports = app
