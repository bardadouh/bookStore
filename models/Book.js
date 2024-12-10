const mongoose = require("mongoose");
const Joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    price: { type: Number, required: true, min: 0 },
    cover: {
      type: String,
      required: true,
      enum :["soft cover", "hard cover"]
    }
  },
  {
    timestamps: true,
  }
);


//Validate Create Book

function validateCreateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(10).max(300).required(),
    price: Joi.number().required(),
    cover: Joi.string().valid("soft cover", "hard cover").trim().required(),
  });
  return schema.validate(book);
}

//Validate Update Book
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string(),
    description: Joi.string().trim().min(10).max(300),
    price: Joi.number(),
    cover: Joi.string().valid("soft cover", "hard cover").trim(),
  });
  return schema.validate(book);
}
const Book = mongoose.model("Book", BookSchema);

module.exports ={
    Book,
    validateCreateBook,
    validateUpdateBook
}

