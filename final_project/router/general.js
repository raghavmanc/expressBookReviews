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
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books)
  for(let i =0; i<keys.length;i++){
    if( (books[parseInt(keys[i])].author) == author){
      res.send(books[parseInt(keys[i])])
    }
  }
  res.send("No book with such author name")
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books)
  for(let i =0; i<keys.length;i++){
    if( (books[parseInt(keys[i])].title) == title){
      res.send(books[parseInt(keys[i])])
    }
  }
  res.send("No book with such title name")
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const keys = Object.keys(books)
  for(let i =0; i<keys.length;i++){
    if( (parseInt(keys[i])) == isbn){
      res.send(books[parseInt(keys[i])].reviews)
    }
  }
  
});

module.exports.general = public_users;
