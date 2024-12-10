const express = require("express");
const router = express.Router();
const { verifyUserAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
// /api/books
router.route("/").get(getAllBooks).post(verifyUserAndAdmin, createBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyUserAndAdmin, updateBook)
  .delete(verifyUserAndAdmin, deleteBook);

module.exports = router;
