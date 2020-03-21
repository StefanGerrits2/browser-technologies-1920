require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('file-system');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const port = process.env.PORT || 3000;

const generator = require('generate-password');

function generateNumber() {
    const user = generator.generate({
        length: 6,
        numbers: true
    });

    return user;
}

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

    // Code
    .get('/getCode', (req, res) => {
        const user = generateNumber();
        console.log('user:', user);
        res.render('getCode.hbs', { user });
    })

    // Page 1
    .get('/questions-1', (req, res) => res.render('questions-1.hbs'))
    .post('/questions-1', urlencodedParser, (req, res) => {
        const user = req.body.user;

        const data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(`answers/${user}.json`, data);

        console.log(data);

        res.render('questions-1.hbs', { user } );
    })

    // Page 2
    .get('/questions-2', (req, res) => res.render('questions-2.hbs'))
    .post('/questions-2', urlencodedParser, (req, res) => {
        const user = req.body.user;

        const data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(`answers/${user}.json`, data);

        console.log(data);

        res.render('questions-2.hbs', { user } );
    })

    // Page 3
    .get('/questions-3', (req, res) => res.render('questions-3.hbs'))
    .post('/questions-3', urlencodedParser, (req, res) => {
        const user = req.body.user;

        const data = JSON.stringify(req.body, null, 2);
        fs.writeFile(`answers/${user}.json`, data);

        console.log(data);

        res.render('questions-3.hbs', { user });
    })

    // Finished
    .get('/finished', (req, res) => res.render('finished.hbs'))
    .post('/finished', urlencodedParser, (req, res) => {
        const user = req.body.user;

        const data = JSON.stringify(req.body, null, 2);
        fs.writeFile(`answers/${user}.json`, data);

        console.log(data);

        res.render('finished.hbs');
    })

    // Existing code?
    // .get('/existingCode', (req, res) => res.render('/existingCode'))
    .post('/existingCode', urlencodedParser, (req, res) => {
        const user = req.body.user;
        const path = `answers/${user}.json`;

        if (fs.existsSync(path)) {
            console.log('The path exists.');

            const existingData = JSON.parse(fs.readFileSync(path, {
                encoding: 'utf8'
            }));

            console.log(existingData);

            res.redirect(existingData.currentpage);
        }
        else {
            console.log('does not exist');
            const invalidCode = true;
            res.render('home.hbs', { invalidCode });
        }
    })

    .listen(port, () => console.log(`Example app listening on port ${port}!`));