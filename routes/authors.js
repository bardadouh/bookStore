const express = require("express");
const router = express.Router();
const { verifyUserAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  getAuthorsById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
} = require("../controllers/authorsController");

// /api/authors
router
  .route("/")
  .get(getAllAuthors)
  .post(verifyUserAndAdmin, createAuthor)
  .post(verifyUserAndAdmin, createAuthor);
// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorsById)
  .put(verifyUserAndAdmin, updateAuthor)
  .delete(verifyUserAndAdmin, deleteAuthor);

module.exports = router;
