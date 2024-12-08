const mongoose = require("mongoose");
const AuthorSchema = new mongoose.AuthorSchema({
    firstName: { type: String, required: true ,trim: true,minlength:3, maxlength:200 },
    lastName: { type: String, required: true, trim: true, minlength:3, maxlength:200 },
    nationality: { type: String, required: true, trim: true, minlength:3, maxlength:200 },
    image: { default: "default-avatar.png"},


},
    { timestamps: true });



    const Author = mongoose.models("Author", AuthorSchema);

    module.exports = {
        Author,
        
    };