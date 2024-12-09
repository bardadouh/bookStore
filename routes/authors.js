const express = require("express");
const router = express.Router();
const { Author,validateCreateAuthor,validateUpdateAuthor } = require("../models/Author");
/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find();
    res.status(200).json(authorList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong " + error.message });
  }
  //   const authorList = await Author.find()
  //     .sort({ firstName: -1 })
  //     .select("firstName lastName -_id");
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */

router.get("/:id", async (req, res) => {
  const authorByID = await Author.findById(req.params.id);

  try {
    if (authorByID) {
      res.status(200).json(authorByID);
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong " + error.message });
  }
});

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access public
 */

router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { firstName, lastName, nationality, image } = req.body;

  try {
    const author = new Author({
      firstName,
      lastName,
      nationality,
      image,
    });

    const result = await author.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong " + error.message });
  }
});

/**
 * @desc Update a author
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */

router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //   if (author) {
  //     res.status(200).json({ message: "author has been updated" });
  //   } else {
  //     res.status(404).json({ message: "author not found" });
  //   }

  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong " + error.message });
  }
});

/**
 * @desc Delete a author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", async (req, res) => { 
  try {
      const author = await Author.findById(req.params.id);

    if (author) {
      await Author.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "author has been deleted" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
    
  } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Somthing went wrong " + error.message });
  }
});



module.exports = router;
