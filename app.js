// const http = require("http");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");

const { notFound, errorHandler} = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();
// connection to db
mongoose
  .connect(process.env.MONGO_URI)
  // check connection
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Connection Failed! TO MongoDB: ", error));

const express = require("express");

//Init App
const app = express();

// Apply Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);

//Error Handler
app.use(notFound);
app.use(errorHandler);

//runing server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is running in${process.env.NODE_ENV} on port ${PORT}`)
);
