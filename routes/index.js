const express = require('express');
const router = express.Router();
const {Books} = require('../db').models;


/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async (req,res,next) => {
        try{
            await cb(req,res);
        }
        catch(error){
            console.log(error); 
            res.status(500).send(error);
        }
    }
}

// Display all the books
router.get('/', asyncHandler( async (req,res) => {
    const books = await Books.findAll();
    if(books){
        res.render('books/index', { books });
    }
    else{
        res.render('books/error');
    }
}));

// Display the create book section
router.get('/create',  asyncHandler( async(req,res) => {
    res.render('books/new-book');
}));

// Create the new book
router.post('/',  asyncHandler( async(req,res) => {
    let book;
    try{
        await Books.create(req.body);   
        res.redirect('/');
    }
    catch(error){
        // checking the error
        if(error.name === "SequelizeValidationError") { 
            book = await Books.build(req.body);
            res.render("books/new-book", { book, errors: error.errors })
        }
        else {
            // error caught in the asyncHandler's catch block
            throw error;
        }  
    }
}));

// Display the details of the book
router.get('/books/:id',  asyncHandler( async (req,res) => {
    const book = await Books.findByPk(req.params.id);
    if(book){
        res.render('books/update-book', { book });
    }
    else{
        res.render('books/error');
    }
}));

// Updates the details of the book and display all books
router.post('/books/:id',  asyncHandler( async (req,res) => {
    let book;
    try{
        book = await Books.findByPk(req.params.id);
        if(book){
            await book.update(req.body);
            res.redirect('/');
        }
        else{
            res.render('books/error');
        }
    }
    catch(error){
         // checking the error
         if(error.name === "SequelizeValidationError") { 
            book = await Books.build(req.body);
            book.id = req.params.id;
            res.render("/books/" + book.id, { book, errors: error.errors })
        }
        else {
            // error caught in the asyncHandler's catch block
            throw error;
        }  
    }
}));

// Delete the book from the books
router.post('/books/:id/delete',  asyncHandler( async (req,res) => {
    const book = await Books.findByPk(req.params.id);
    await book.destroy(req.body);
    if(book){
        res.redirect('/');
    }
    else{
        res.render('books/error');
    }
}));

module.exports = router;