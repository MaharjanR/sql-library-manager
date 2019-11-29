const express = require('express');
const router = express.Router();
const {Books} = require('../db').models;


// Display all the books
router.get('/', async (req,res) => {
    const books = await Books.findAll();
    res.render('books/index', { books });
});

// Display the create book section
router.get('/create', async(req,res) => {
    res.render('books/new-book');
});

// Create the new book
router.post('/', async(req,res) => {
    const book = await Books.create(req.body);
    res.redirect('/');
});

// Display the details of the book
router.get('/books/:id', async (req,res) => {
    const book = await Books.findByPk(req.params.id);
    res.render('books/update-book', { book });
});

// Updates the details of the book and display all books
router.post('/books/:id', async (req,res) => {
    const book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/');
});

// Delete the book from the books
router.post('/books/:id/delete', async (req,res) => {
    const book = await Books.findByPk(req.params.id);
    await book.destroy(req.body);
    res.redirect('/');
});

module.exports = router;