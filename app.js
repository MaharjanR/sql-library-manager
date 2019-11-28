const express = require('express');
const mainRoute = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.use(mainRoute);

app.listen('3000', () =>{
    console.log('It is running in localhost:3000');
})