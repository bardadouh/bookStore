const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");
/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorsPerPage = 2;
  const authorList = await Author.find()

    .skip((pageNumber - 1) * authorsPerPage)
    .limit(authorsPerPage);

  res.status(200).json(authorList);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

const getAuthorsById = asyncHandler(async (req, res) => {
  const authorByID = await Author.findById(req.params.id);
  if (authorByID) {
    res.status(200).json(authorByID);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private only admin
 */

const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { firstName, lastName, nationality, image } = req.body;

  const author = new Author({
    firstName,
    lastName,
    nationality,
    image,
  });

  const result = await author.save();
  res.status(201).json(result);
});

/**
 * @desc Update a author
 * @route /api/authors/:id
 * @method PUT
 * @access private only admin
 */

const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );

  res.status(200).json(author);
});

/**
 * @desc Delete a author
 * @route /api/authors/:id
 * @method DELETE
 * @access private only admin
 */

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    await Author.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "author has been deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});
module.exports ={
    deleteAuthor,
    getAllAuthors,
    getAuthorsById,
    createAuthor,
    updateAuthor,
    
}