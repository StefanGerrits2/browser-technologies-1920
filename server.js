require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('file-system');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const port = process.env.PORT || 3000;

const generator = require('generate-password');

let user = '';

const password = generator.generate({
    length: 6,
    numbers: true
});

console.log(password);

const app = express();
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
    .get('/getCode', (req, res) => res.render('getCode.hbs', { password }))

    // Page 1
    // .get('/questions-1', (req, res) => res.render('questions-1.hbs'))
    .post('/questions-1', urlencodedParser, (req, res) => {
        const data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(`answers/${password}.json`, data);

        console.log(data);

        user = password;

        res.render('questions-1.hbs', { user } );
    })

    // Page 2
    // .get('/questions-2', (req, res) => res.render('questions-2.hbs'))
    .post('/questions-2', urlencodedParser, (req, res) => {
        const data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(`answers/${password}.json`, data);

        console.log(data);

        user = password;

        res.render('questions-2.hbs', { user } );
    })

    // Page 3
    // .get('/questions-3', (req, res) => res.render('questions-3.hbs'))
    .post('/questions-3', urlencodedParser, (req, res) => {
        const data = JSON.stringify(req.body, null, 2);
        fs.writeFile(`answers/${password}.json`, data);

        console.log(data);

        user = password;

        res.render('questions-3.hbs', { user });
    })

    // Finished
    // .get('/finished', (req, res) => res.render('finished.hbs'))
    .post('/finished', urlencodedParser, (req, res) => {
        const data = JSON.stringify(req.body, null, 2);
        fs.writeFile(`answers/${password}.json`, data);

        console.log(data);

        res.render('finished.hbs');
    })

    .listen(port, () => console.log(`Example app listening on port ${port}!`));