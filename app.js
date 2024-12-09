// const http = require("http");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// connection to db
mongoose.connect(process.env.MONGO_URI)

// check connection
.then(() => console.log("Connected to MongoDB..."))
.catch((error) => console.log("Connection Failed! TO MongoDB: ", error));

const express = require("express");
//Init App
const app = express();

// Apply Middleware
app.use(express.json());

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
//runing server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running in${process.env.NODE_ENV} on port ${PORT}`));
