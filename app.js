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

app.listen('3000', () =>{
    console.log('It is running in localhost:3000');
})