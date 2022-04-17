const mongoose = require("mongoose")

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready")
})

mongoose.connection.on("error", error => {
  console.error(error)
})

const mongoConnect = async () => {
  await mongoose.connect(`${process.env.MONGODB_CONNECTION}`)
}


// Jest requires database to disconnect when done
async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}
