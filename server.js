const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const port = 3000;
const publicPath = path.join(__dirname, './public/');

app
    .set('view engine', 'hbs')
    .engine( 'hbs', hbs( {
        extname: 'hbs',
        defaultLayout: 'main',
        partialsDir: __dirname + '/views/partials/'
    }))
    .use('/', express.static(publicPath))

    // Get routes
    .get('/', (req, res) => res.render('home.hbs'))
    .get('/getCode', (req, res) => res.render('getCode.hbs'))
    .get('/questions-1', (req, res) => res.render('questions-1.hbs'))

    .listen(port, () => console.log(`Example app listening on port ${port}!`));