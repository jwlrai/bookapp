var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

const book = require('./book');
exports.Book = book;