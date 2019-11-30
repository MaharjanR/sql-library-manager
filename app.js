const express = require('express');
const mainRoute = require('./routes');
const bodyParser = require('body-parser')
const app = express();


// view engine setup
app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(mainRoute);

app.use( (req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// renders the error page if no routes found
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('books/error');
});

app.listen('3000', () =>{
    console.log('It is running in localhost:3000');
})