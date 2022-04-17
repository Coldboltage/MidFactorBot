const mongoose = require("mongoose")

// Midnite Away Team === Factor Team 1
// Midnite Home Team === Factor Team 2

const matchFactorToMidniteGames = async (factorGames, midniteGames) => {
  // Check each Factor game versus every Midnite game.
  // First: Check if Midnite has a game with home team
  // Second: In case Midnite have multiple games with the home team, check if the away team also matches
  // Third: Check if the match happens within 2 hours using time protocol.
  
}

module.exports = {
  matchFactorToMidniteGames,

}