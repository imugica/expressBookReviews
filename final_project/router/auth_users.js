const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "your_username", "password": "your_password"}];

const isValid = (username)=>{ //returns boolean
  return users.some(user => user.username === username); 
}

const authenticatedUser = (username,password)=>{ //returns boolean
  const user = users.find(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username exists in the users array
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Check if the password matches
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const accessToken = jwt.sign({ username }, "access", { expiresIn: '1h' });

  // Return the token to the client
  return res.json({ message: "Login successful", accessToken });

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
