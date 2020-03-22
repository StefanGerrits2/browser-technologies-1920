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

        // New data
        const newData = req.body;

        // Existing data
        const existingData = JSON.parse(fs.readFileSync(`answers/${user}.json`, { encoding: 'utf8'}));

        // Add new data
        existingData.user = newData.user,
        existingData.currentpage = newData.currentpage,
        existingData.age = newData.age;
        existingData.fullname = newData.fullname;
        existingData.reason = newData.reason;
        existingData.needhelp = newData.needhelp;

        // Stringify new data
        const allData = JSON.stringify(existingData, null, 2);

        // Write file
        fs.writeFileSync(`answers/${user}.json`, allData);

        res.render('questions-2.hbs', { user } );
    })

    // Page 3
    .get('/questions-3', (req, res) => res.render('questions-3.hbs'))
    .post('/questions-3', urlencodedParser, (req, res) => {
        const user = req.body.user;

        // New data
        const newData = req.body;

        // Existing data
        const existingData = JSON.parse(fs.readFileSync(`answers/${user}.json`, { encoding: 'utf8'}));

        // Add new data
        existingData.currentpage = newData.currentpage,
        existingData.healhissues = newData.healthissues;
        existingData.question6 = newData.question6;
        existingData.question7 = newData.question7;

        // Stringify new data
        const allData = JSON.stringify(existingData, null, 2);

        // Write file
        fs.writeFileSync(`answers/${user}.json`, allData);

        res.render('questions-3.hbs', { user });
    })

    // Finished
    .get('/finished', (req, res) => res.render('finished.hbs'))
    .post('/finished', urlencodedParser, (req, res) => {
        const user = req.body.user;

        // New data
        const newData = req.body;

        // Existing data
        const existingData = JSON.parse(fs.readFileSync(`answers/${user}.json`, { encoding: 'utf8'}));

        // Add new data
        existingData.currentpage = newData.currentpage,
        existingData.street = newData.street;
        existingData.housenumber = newData.housenumber;
        existingData.zipcode = newData.zipcode;
        existingData.questions = newData.questions;

        // Stringify new data
        const allData = JSON.stringify(existingData, null, 2);

        // Write file
        fs.writeFileSync(`answers/${user}.json`, allData);

        res.render('finished.hbs');
    })

    // Existing code?
    // .get('/existingCode', (req, res) => res.render('/existingCode'))
    .post('/existingCode', urlencodedParser, (req, res) => {
        const user = req.body.user;

        if (fs.existsSync(`answers/${user}.json`)) {
            console.log('The path exists.');

            const existingData = JSON.parse(fs.readFileSync(`answers/${user}.json`, {
                encoding: 'utf8'
            }));

            console.log(existingData);
            const needhelp = existingData.needhelp === 'yes' ? true : false;
            console.log(needhelp);

            res.render(existingData.currentpage, {
                user: existingData.user,
                age: existingData.age,
                fullname: existingData.fullname,
                reason: existingData.reason,
                needhelp,
            });
        }
        else {
            console.log('does not exist');
            const invalidCode = true;
            res.render('home.hbs', { invalidCode });
        }
    })

    .listen(port, () => console.log(`Example app listening on port ${port}!`));

// // Page 2
// .get('/questions-2', (req, res) => res.render('questions-2.hbs'))
// .post('/questions-2', urlencodedParser, (req, res) => {
//     const user = req.body.user;
    
//     // Existing data
//     const readFileData = fs.readFileSync(`answers/${user}.json`);
//     const parsed = JSON.parse(readFileData);
//     console.log('parsed', parsed);
    
//     // New data
//     const newData = JSON.stringify(req.body, null, 2);
//     console.log('newdata:', newData);
    
//     // Add new data to existing data
//     for (const key in newData) {
//         parsed.push(key);
//     }
            
//     fs.writeFileSync(`answers/${user}.json`, parsed);
    
//     console.log(parsed);
    
//     res.render('questions-2.hbs', { user } );
// })