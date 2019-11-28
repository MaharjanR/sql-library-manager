const express = require('express');
const router = express.Router();
const Books = require('../db/model').Books;

router.get('/', async (req,res) => {
    const books = await Books.findAll();
    console.log(books);
    res.render('books/index');
});

module.exports = router;