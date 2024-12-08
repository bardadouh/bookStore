const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    description: "Book 1 description",
    publicationDate: "2022-01-01",
    isAvailable: true,
    genre: "Fiction",
    rating: 4.5,
    pages: 200,
  },
  {
    id: 2,
    title: "Book 1",
    author: "Author 1",
    description: "Book 1 description",
    publicationDate: "2022-01-01",
    isAvailable: true,
    genre: "Fiction",
    rating: 4.5,
    pages: 200,
  },
];

//Http methodes / verbs
//rouleback handeler,callback function
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome  EXPRESS Js</h1>");
// });
// app.post();
// app.delete();
// app.put();

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */

router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public
 */

router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const {
    title,
    author,
    description,
    publicationDate,
    isAvailable,
    genre,
    rating,
    pages,
  } = req.body;

  //   if (!title || title.length < 3) {
  //     return res.status(400).json({
  //       message: "Title is required and must be more than 3 characters",
  //     });
  //   }
  //   if (!author || author.length < 3) {
  //     return res.status(400).json({
  //       message: "Author is required and must be more than 3 characters",
  //     });
  //   }
  //   if (!description || description.length < 10) {
  //     return res.status(400).json({
  //       message: "Description is required and must be at least 10 characters",
  //     });
  //   }

  //   if (!publicationDate || isNaN(Date.parse(publicationDate))) {
  //     return res
  //       .status(400)
  //       .json({ message: "Valid publication date is required" });
  //   }

  //   if (typeof isAvailable !== "boolean") {
  //     return res
  //       .status(400)
  //       .json({ message: "isAvailable must be a boolean value" });
  //   }

  //   if (
  //     rating !== undefined &&
  //     (typeof rating !== "number" || rating < 0 || rating > 5)
  //   ) {
  //     return res
  //       .status(400)
  //       .json({ message: "Rating must be a number between 0 and 5" });
  //   }

  //   if (pages !== undefined && (!Number.isInteger(pages) || pages <= 0)) {
  //     return res
  //       .status(400)
  //       .json({ message: "Pages must be a positive integer" });
  //   }

  const book = {
    id: books.length + 1,
    title,
    author,
    description,
    publicationDate,
    isAvailable,
    genre,
    rating,
    pages,
  };
  books.push(book);
  res.status(201).json(book);
});

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {
    const { error } = validateUpdateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book =books.find(book => book.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message: "Book has been updated"});
    } else {
        res.status(404).json({ message: "Book not found" });
    }

});

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", (req, res) => {
    const book =books.find(book => book.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message: "Book has been deleted"});
    } else {
        res.status(404).json({ message: "Book not found" });
    }

});

//Validate Create Book

function validateCreateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(10).max(300).required(),
    publicationDate: Joi.date().required(),
    isAvailable: Joi.boolean().required(),
    genre: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    pages: Joi.number().min(1).required(),
  });
  return schema.validate(book);
}

//Validate Update Book
function validateUpdateBook(book) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(10).max(300),
    publicationDate: Joi.date(),
    isAvailable: Joi.boolean(),
    genre: Joi.string(),
    rating: Joi.number().min(1).max(5),
    pages: Joi.number().min(1),
  });
  return schema.validate(book);
}

module.exports = router;
