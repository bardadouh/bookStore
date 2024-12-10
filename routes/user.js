const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const {
  verifyUserAndAuthorization,
  verifyUserAndAdmin,
} = require("../middlewares/verifyToken");

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */

router.put(
  "/:id",
  verifyUserAndAuthorization,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    console.log(req.headers);
    const { email, username, name, password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email,
          username,
          name,
          password: hashedPassword,
        },
      },
      { new: true }
    ).select("-password");

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updateUser);
  })
);

/**
 * @desc Get All Users
 * @route /api/users/
 * @method GET
 * @access private (only admin)
 */

router.get(
  "/",
  verifyUserAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  })
);

/**
 * @desc Get User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */

router.get(
  "/:id",
  verifyUserAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  })
);

/**
 * @desc Delete User
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */

router.delete(
  "/:id",
  verifyUserAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User has been deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  })
);

module.exports = router;
