// const http = require("http");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");

// connection to db
mongoose.connect("mongodb://localhost/bookStoreDB")

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
const PORT = 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
