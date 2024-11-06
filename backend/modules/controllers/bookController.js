const { getBooks, saveBooks } = require('../models/bookModel');


const getFilteredBooks = (req, res) => {
    let books = getBooks();
    const { title, author, year, description } = req.query;
  
    if (title) {
      books = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (author) {
      books = books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (year) {
      books = books.filter(book => book.year === parseInt(year));
    }
    if (description) {
      books = books.filter(book => book.description.toLowerCase().includes(description.toLowerCase()));
    }
  
    res.json(books);
  };
  
  module.exports = {
    getFilteredBooks
  };

