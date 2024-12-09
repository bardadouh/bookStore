const mongoose = require("mongoose");
const Joi = require("joi");


const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
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
    rating: { type: Number, min: 0, max: 5 },
    pages: { type: Number, min: 1, max: 1000 },
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
    rating: Joi.number().min(1).max(5).required(),
    pages: Joi.number().min(1).required(),
  });
  return schema.validate(book);
}

//Validate Update Book
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string(),
    description: Joi.string().trim().min(10).max(300),
    rating: Joi.number().min(1).max(5),
    pages: Joi.number().min(1),
  });
  return schema.validate(book);
}
const Book = mongoose.model("Book", BookSchema);

module.exports ={
    Book,
    validateCreateBook,
    validateUpdateBook
}

