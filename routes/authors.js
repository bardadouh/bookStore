const express = require("express");
const router = express.Router();
const Joi = require("joi");

const authors = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    bio: "John Doe is a famous author.",
  },
];

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access public
 */

router.post("/", (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { name, age, bio } = req.body;

  const author = {
    id: authors.length + 1,
    name,
    age,
    bio,
  };
  authors.push(author);
  res.status(201).json(author);
});

/**
 * @desc Update a author
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */

router.put("/:id", (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = authors.find(
    (author) => author.id === parseInt(req.params.id)
  );
  if (author) {
    res.status(200).json({ message: "author has been updated" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

/**
 * @desc Delete a author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", (req, res) => {
  const author = authors.find(
    (author) => author.id === parseInt(req.params.id)
  );
  if (author) {
    res.status(200).json({ message: "author has been deleted" });
  } else {
    res.status(404).json({ message: "author not found" });
  }
});

//Validate Create Author

function validateCreateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required(),
    age: Joi.number().min(18).max(100).required(),
    bio: Joi.string().trim().min(10).max(300).required(),
  });
  return schema.validate(author);
}

//Validate Update Author
function validateUpdateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(200),
    age: Joi.number().min(18).max(100),
    bio: Joi.string().trim().min(10).max(300),
  });
  return schema.validate(author);
}

module.exports = router;
