
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const {
  User,
  validateRegistrationUser,
  validateLoginUser,
} = require("../models/User");

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */
module.exports.register = asyncHandler(async (req, res) => {
  const { error } = validateRegistrationUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, username, email, password, isAdmin } = req.body;

  let user = await User.findOne({ email });

  if (user) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  const result = await user.save();
  const token = user.generateToken();

  const { password: _password, ...other } = result._doc;

  res.status(201).json({ ...other, token });
});

/**
 * @desc Login User
 * @route /api/auth/login
 * @method POST
 * @access public
 */

module.exports.login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = user.generateToken();

  const { password: _password, ...other } = user._doc;

  res.status(200).json({ ...other, token });
});

// module.exports = { register };
