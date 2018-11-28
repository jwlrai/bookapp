const mongoose = require('mongoose');

const bookSchema =  new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    releaseDate: String
});

const Book = mongoose.model('book',bookSchema);
module.exports = Book;