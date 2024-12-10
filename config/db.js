const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose
    .connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB...")
  } catch (error) {
    console.log("Connection Failed! TO MongoDB: ", error)
  }
}
module.exports = connectToDB;



// // connection to db
// mongoose
//   .connect(process.env.MONGO_URI)
//   // check connection
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((error) => console.log("Connection Failed! TO MongoDB: ", error));
