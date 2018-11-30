var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var database = require("./database.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


////////////////////////////////////////////////////////////////////////////////
//
// RESTFUL HANDLERS
//
////////////////////////////////////////////////////////////////////////////////

/* GET index page */
app.get('/', (req, res, next) => {
    res.render('index', { title: 'Oh BABBBY' });
});

/* GET data dump */
app.get('/alldata', function(req, res, next) {
    database.getAll().then(function(data) {
        res.send(data);
    }).catch(function(err) {
        next(err);
    });
});

/* GET all projects */
app.get('/project/all', function(req, res, next) {
    database.getAllProjects().then(function(projects) {
        res.send(projects);
    }).catch(function (err) {
        next(err);
    });
});


/* GET project of specific pid */
app.get('/project/:pid', function(req, res, next) {
    database.getProject(req.params.pid).then(function(project) {
        res.send(project);
    }).catch(function (err) {
        next(err);
    });
});

/* POST new project */
app.post('/project', function(req, res, next) {
    database.makeProject(req.body.name).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
});

/* PUT new link between flashcard and tag */
app.put('/link', function(req, res, next) {
    database.linkFlashcardToTag(req.body.tid, req.body.fid).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
});

/* GET all tags of a specific project */
app.get('/project/:pid/tag/all', function(req, res, next) {
    database.getAllTags(req.params.pid).then(function(tags) {
        res.send(tags);
    }).catch(function (err) {
        next(err);
    });
});

/* GET tag of specific tid */
app.get('/project/:pid/tag/:tid', function(req, res, next) {
    database.getTag(req.params.pid, req.params.tid).then(function(tag) {
        res.send(tag);
    }).catch(function (err) {
        next(err);
    });
});

/* GET all flashcards of a specific tag */
app.get('/project/:pid/tag/:tid/all', function(req, res, next) {
    database.getFlashcardsByTag(req.params.pid, req.params.tid).then(function(flashcards) {
        res.send(flashcards);
    }).catch(function (err) {
        next(err);
    });
});

/* POST new tag */
app.post('/project/:pid/tag', function(req, res, next) {
    database.makeTag(req.params.pid, req.body.name).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
});

/* GET all flashcards for a specific pid */
app.get('/:fid', function(req, res, next) {
    database.gatAllFlashcards(req.params.pid).then(function(flashcards) {
        res.send(flashcards);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Getting flashcard with fid: ' + req.params.fid + ' from project with pid: ' + req.params.pid);
});

/* GET flashcard for specific fid */
app.get('/project/:pid/flashcard/:fid', function(req, res, next) {
    database.getFlashcard(req.params.pid, req.params.fid).then(function(flashcard) {
        res.send(flashcard);
    }).catch(function (err) {
        next(err);
    });
});

/* POST new flashcard */
app.post('/project/:pid/flashcard', function(req, res, next) {
    database.makeFlashcard(req.params.pid, req.body.title, req.body.content).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
});

////////////////////////////////////////////////////////////////////////////////
//
// ERROR HANDLERS
//
////////////////////////////////////////////////////////////////////////////////

/* catch 404 and forward to error handler */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* error handler */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
