var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
var auth = require('./routes/auth');
var projects = require('./routes/projects');
var tags = require('./routes/tags');
var flashcards = require('./routes/flashcards');

var mysqlSession = require('express-mysql-session');
var session = require('express-session');
var requiresLogin = require('./routes/authUtils').requiresLogin;
const db = require('./db_credentials.json');


var app = express();
const MySQLStore = mysqlSession(session);
// Session store options
const options = {
    host: db.host,
    port: 3306,
    user: db.username,
    password: db.password,
    database: db.db_name,
    cookie: {secure: false}
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    options.cookie.secure = true; // serve secure cookies
}

const sessionStore = new MySQLStore(options);

//use sessions for tracking login
app.use(session({
    key: 'chakraSesh',
    secret: 'lampshade bedsheets heater-wall clothing extension charger-cable',
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/project', requiresLogin, projects);
app.use('/project/:pid/tag', requiresLogin, tags);
app.use('/project/:pid/flashcard', requiresLogin, flashcards);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

console.log("Hihi");