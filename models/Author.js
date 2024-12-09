const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema({
    firstName: { type: String, required: true ,trim: true,minlength:3, maxlength:200 },
    lastName: { type: String, required: true, trim: true, minlength:3, maxlength:200 },
    nationality: { type: String, required: true, trim: true, minlength:3, maxlength:200 },
    image: { type: String, default: "default-avatar.png"},
},
    { timestamps: true }
    
);
    const Author = mongoose.model("Author", AuthorSchema);

    //Validate Create Author

function validateCreateAuthor(author) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(3).max(100).required(),
    image: Joi.string().optional(),
    // name: Joi.string().trim().min(3).max(200).required(),
    // age: Joi.number().min(18).max(100).required(),
    // bio: Joi.string().trim().min(10).max(300).required(),
  });
  return schema.validate(author);
}

//Validate Update Author
function validateUpdateAuthor(author) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(3).max(100),
    image: Joi.string().optional(),
    // name: Joi.string().trim().min(3).max(200),
    // name: Joi.string().trim().min(3).max(200),
    // age: Joi.number().min(18).max(100),
    // bio: Joi.string().trim().min(10).max(300),
  });
  return schema.validate(author);
}
    module.exports = {
        Author,
        validateCreateAuthor,
        validateUpdateAuthor
    };