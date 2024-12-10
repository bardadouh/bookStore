const asyncHandler = require("express-async-handler");


/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */

const getAllBooks = asyncHandler(async (req, res) => {
  // Comparison Query Operators
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(books);
});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
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
 * @access private only admin
 */

const createBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access private only admin
 */
const updateBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access private only admin
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book has been deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
