const path = require("path")
const express = require("express")
var cors = require('cors')

// Routers to bring and setup
// const matchesRouter = require("./routes/matches/matches.router")
const api = require("./routes/api")

const app = express()

app.use(cors())

// Create match router
// app.use("/matches", matchesRouter)
app.use("/api", api)

app.use(express.static(path.join(__dirname,  "..","..", "client", "out")));

app.get('(/)', async (req, res, next) => {
  res.sendFile(path.join(__dirname,  "..","..", "client", "out", 'index.html'));
});

app.get('(/dashboard*?)', async (req, res, next) => {
  res.sendFile(path.join(__dirname,  "..","..", "client", "out", 'dashboard.html'));
});

module.exports = app
