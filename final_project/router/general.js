const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');






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

async function task10(req, res){
  let response = await JSON.stringify(books,null,4);
    if (response.err) { console.log('error');}
    else { res.send(response);}
}

// Get the book list available in the shop
public_users.get('/', task10);

async function task11(req, res){
  const isbn = req.params.isbn;
  let response = await books[isbn];
    if (response.err) { console.log('error');}
    else { res.send(response);}
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',task11);

async function task12(req, res){
  const author = req.params.author;
  const keys = Object.keys(books)

  for(let i =0; i<keys.length;i++){
    if( (books[parseInt(keys[i])].author) == author){
    response = await books[parseInt(keys[i])]
    }
  }
    if (response.err) { console.log('error');}
    else { res.send(response);}
}
  
// Get book details based on author
public_users.get('/author/:author',task12);

async function task13(req, res){
  const title = req.params.title;
  const keys = Object.keys(books)

  for(let i =0; i<keys.length;i++){
    if( (books[parseInt(keys[i])].title) == title){
    response = await books[parseInt(keys[i])]
    }
  }
    if (response.err) { console.log('error');}
    else { res.send(response);}
}
  


// Get all books based on title
public_users.get('/title/:title',task13);

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
