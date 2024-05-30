const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (isbn !== undefined) {
    const isbn = req.params.title;
    const booksByIsbn = Object.values(books).filter(book => book.author === isbn);
  
    if (booksByIsbn.length > 0) {
      res.status(200).json(booksByIsbn);
    } else {
      res.status(404).json({ error: 'Books by isbn not found' });
    }
  }
  });


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);

  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor);
  } else {
    res.status(404).json({ error: 'Books by author not found' });
  }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const author = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.author === title);

  if (booksByTitle.length > 0) {
    res.status(200).json(booksByTitle);
  } else {
    res.status(404).json({ error: 'Books by title not found' });
  }
});



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const booksByIsbn = Object.values(books).filter(book => book.author === title);

  if (booksByIsbn.length > 0) {
    res.status(200).json(booksByTitle.reviews);
  } else {
    res.status(404).json({ error: 'isbn not found' });
  }
});

module.exports.general = public_users;
