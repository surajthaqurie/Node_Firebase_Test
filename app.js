const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Create instance of Express app
const app = express();


// Setting Engine to HTMl for rendering Files
app.engine('html', require('ejs').renderFile); // app.set('veiw engine', 'ejs');
app.set('view engine', 'html');

// We also want to send JS, Css, Images and other Static Files
app.use(express.static('public'));
// Set path for Render the static Files(Folders)
app.set('public', __dirname + '/public');

// Give the Server Access To the User input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));

// API (Routes)
app.get('/', (req, res) => {
    // res.send('<h1> This is an example of FireBase</h1>');
    res.render('home');
});

app.post('/', (req, res) => {
    // Send Back a page with yelled BreakFast on it.
    const BreakFast = req.body.breakfast;
    res.render('results', {
        data: BreakFast
    });
});

module.exports = app;