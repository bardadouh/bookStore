const { Book } = require('./models/Book');
const { Author } = require("./models/Author");

const { Books,Authors } = require('./data');
const connectToDb = require('./config/db');
require('dotenv').config();



connectToDb();
//import  all books (seeding db)
const importBooks = async () => {
try {
  await Book.insertMany(Books);
  console.log("Books imported successfully");
} catch (error) {
    console.error('Error importing books', error);
    process.exit(1);
}

}
//import  all auhthors (seeding db)
const importAuthors = async () => {
try {
  await Author.insertMany(Authors);
  console.log("Authors imported successfully");
} catch (error) {
    console.error('Error importing books', error);
    process.exit(1);
}

}

//Remove  all books ()
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books removed successfully");
  } catch (error) {
    console.error("Error removing books", error);
    process.exit(1);
  }
}

if (process.argv[2] === '-import') {
    importBooks();
} else if (process.argv[2] === '-remove'){
    removeBooks();
} else if (process.argv[2] === '-import-authors') {
  importAuthors();
}