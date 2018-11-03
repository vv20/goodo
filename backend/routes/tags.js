var express = require('express');
var router = express.Router({ mergeParams: true});
var database = require('../database.js');


/* GET all tags of a specific project */
router.get('/all', function(req, res, next) {
    database.getAllTags(req.params.pid).then(function(tags) {
        res.send(tags);
    })
    // res.send('Getting all tags from project with pid: ' + req.params.pid);
});

/* GET tag of specific tid */
router.get('/:tid', function(req, res, next) {
    database.getTag(req.params.pid, req.params.tid).then(function(tag) {
        res.send(tag);
    })
    // res.send('Getting tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});

/* GET all flashcards of a specific tag */
router.get('/:tid/all', function(req, res, next) {
    database.getFlashcardsByTag(req.params.pid, req.params.tid).then(function(flashcards) {
        res.send(flashcards);
    })
    // res.send('Getting all flashcards from tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});



/* POST new tag */
router.post('/', function(req, res, next) {
    database.makeTag(req.params.pid, req.body.id, req.body.name);
    res.send('Updating tag from project with pid: ' + req.params.pid + ' - \n' +
        '  "tag": {\n' +
        '    "id": ' + req.body.id + ',\n' +
        '    "name": ' + req.body.name + '\n' +
        '  },');
});

module.exports = router;
