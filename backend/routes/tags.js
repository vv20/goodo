var express = require('express');
var router = express.Router({ mergeParams: true});


router.get('/all', function(req, res, next) {
    res.send('Getting all tags from project with pid: ' + req.params.pid);
});

router.get('/:tid', function(req, res, next) {
    res.send('Getting tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});

router.get('/:tid/all', function(req, res, next) {
    res.send('Getting all flashcards from tag with tid: ' + req.params.tid + ' from project with pid: ' + req.params.pid);
});



router.post('/', function(req, res, next) {
    res.send('Updating tag from project with pid: ' + req.params.pid + ' - \n' +
        '  "tag": {\n' +
        '    "id": "id",\n' +
        '    "name": "name"\n' +
        '  },');
});

module.exports = router;
