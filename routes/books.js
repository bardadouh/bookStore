const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

// const books = [
//   {
//     id: 1,
//     title: "Book 1",
//     author: "Author 1",
//     description: "Book 1 description",
//     publicationDate: "2022-01-01",
//     isAvailable: true,
//     genre: "Fiction",
//     rating: 4.5,
//     pages: 200,
//   },
//   {
//     id: 2,
//     title: "Book 1",
//     author: "Author 1",
//     description: "Book 1 description",
//     publicationDate: "2022-01-01",
//     isAvailable: true,
//     genre: "Fiction",
//     rating: 4.5,
//     pages: 200,
//   },
// ];

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

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(books);
  })
);

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  })
);

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public
 */

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, author, description, rating, pages } = req.body;

    const book = new Book({
      title,
      author,
      description,
      rating,
      pages,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { title, author, description, rating, pages } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          author,
          description,
          rating,
          pages,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  })
);

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Book has been deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  })
);

module.exports = router;
