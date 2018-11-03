var express = require('express');
var router = express.Router({ mergeParams: true});
var database = require('../database.js');


/* GET all flashcards for a specific pid */
router.get('/:fid', function(req, res, next) {
    database.gatAllFlashcards(req.params.pid).then(function(flashcards) {
        res.send(flashcards);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Getting flashcard with fid: ' + req.params.fid + ' from project with pid: ' + req.params.pid);
});

/* GET flashcard for specific fid */
router.get('/:fid', function(req, res, next) {
    database.getFlashcard(req.params.pid, req.params.fid).then(function(flashcard) {
        res.send(flashcard);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Getting flashcard with fid: ' + req.params.fid + ' from project with pid: ' + req.params.pid);
});



/* POST new flashcard */
router.post('/', function(req, res, next) {
    database.makeFlashcard(req.params.pid, req.body.title, req.body.content).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Updating flashcard from project with pid: ' + req.params.pid + ' - \n' +
    //     '  "flashcard": {\n' +
    //     '    "id": ' + req.body.id + ',\n' +
    //     '    "title": ' + req.body.title + ',\n' +
    //     '    "content": ' + req.body.content + '\n' +
    //     '  },');
});


module.exports = router;
