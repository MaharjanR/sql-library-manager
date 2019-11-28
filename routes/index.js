const express = require('express');
const router = express.Router();
const {Books} = require('../db').models;

router.get('/', async (req,res) => {
    const books = await Books.findAll();
    console.log(books);
    console.log(books.Book)
    console.log(books.length);
    res.render('books/index', books);
});

module.exports = router;