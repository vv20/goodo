var express = require('express');
var router = express.Router({ mergeParams: true});
// var database = require('../database.js');


router.get('/all', function(req, res, next) {
    // database.getAllTags(req.params.pid);
    res.send('Getting all tags from project with pid: ' + req.params.pid);
});

router.get('/:tid', function(req, res, next) {
    // database.getTag(req.params.pid, req.params.tid);
    res.send('Getting tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});

router.get('/:tid/all', function(req, res, next) {
    // database.getFlashcardsByTag(req.params.pid, req.params.tid);
    res.send('Getting all flashcards from tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});



router.post('/', function(req, res, next) {
    // database.makeTag(req.params.pid, req.body.id, req.body.name);
    res.send('Updating tag from project with pid: ' + req.params.pid + ' - \n' +
        '  "tag": {\n' +
        '    "id": ' + req.body.id + ',\n' +
        '    "name": ' + req.body.name + '\n' +
        '  },');
});

module.exports = router;
