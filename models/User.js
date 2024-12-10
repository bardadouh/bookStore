const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
      validate: {
        validator: (value) =>
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value),
        message: "{VALUE} is not a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

//Generate Token
UserSchema.methods.generateToken = function(){
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
}

const User = mongoose.model("User", UserSchema);


// Validate Registration User
function validateRegistrationUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).required().trim(),
        username: Joi.string().min(3).max(20).required().trim(),
        });
    return schema.validate(user);
}
// Validate Login User

function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).required().trim(),
    });
    return schema.validate(user);
}

// Validate Update User

function validateUpdateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(100).email(),
        password: Joi.string().min(8).trim(),
        username: Joi.string().min(3).max(20).trim(),
    });
    return schema.validate(user);
}

module.exports = {
    User,
    validateRegistrationUser,
    validateLoginUser,
    validateUpdateUser,
}