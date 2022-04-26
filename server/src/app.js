const path = require("path")

const express = require("express")
// Routers to bring and setup
// const matchesRouter = require("./routes/matches/matches.router")
const api = require("./routes/api")

const app = express()

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
