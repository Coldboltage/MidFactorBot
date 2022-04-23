const path = require("path")

const express = require("express")
// Routers to bring and setup
const matchesRouter = require("./routes/matches/matches.router")

const app = express()

// Create match router
app.use("/matches", matchesRouter)

app.use(express.static(path.join(__dirname,  "..","..", "client", "out")));

app.get('(/*)', async (req, res, next) => {
  res.sendFile(path.join(__dirname,  "..","..", "client", "out", 'index.html'));
});


module.exports = app
