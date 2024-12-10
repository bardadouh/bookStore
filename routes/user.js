const express = require("express");
const router = express.Router();
const {
  verifyUserAndAuthorization,
  verifyUserAndAdmin,
} = require("../middlewares/verifyToken");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

// /api/users
router.route("/").get(verifyUserAndAdmin, getAllUsers);

// /api/users/:id
router
  .route("/:id")
  .put(verifyUserAndAuthorization, updateUser)
  .get(verifyUserAndAuthorization, getUserById)
  .delete(verifyUserAndAuthorization, deleteUser);

module.exports = router;
