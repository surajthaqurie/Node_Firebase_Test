const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const admin = require('firebase-admin');

const servericeAccount = require('./serviceKey.json');

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(servericeAccount),
    databaseURL: 'https://node-firebase-fd9fd.firebaseio.com'
});

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

// Create authentication middleware
function isAuthenticated(req, res, next) {
    // check is user is logged in
    // if they are, attach the user to the request object and call next
    // if they are not, send them to the login page
    // with a message saying : "login!"

}

// API (Routes)
app.get('/', (req, res) => {
    // res.send('<h1> This is an example of FireBase</h1>');
    res.render('home');
});

app.get('/homecoming-queen', isAuthenticated, (req, res) => {
    res.render('homecomingQueen.html');
});

app.post('/', (req, res) => {
    // Send Back a page with yelled BreakFast on it.
    const BreakFast = req.body.breakfast;
    res.render('results', {
        data: BreakFast
    });
});

module.exports = app;