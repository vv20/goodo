var express = require('express');
var router = express.Router({ mergeParams: true});


router.get('/:fid', function(req, res, next) {
    res.send('Getting flashcard with fid: ' + req.params.fid + ' from project with pid: ' + req.params.pid);
});

router.post('/', function(req, res, next) {
    res.send('Updating flashcard from project with pid: ' + req.params.pid + ' - \n' +
        '  "flashcard": {\n' +
        '    "id": "id",\n' +
        '    "title": "title",\n' +
        '    "content": "content"\n' +
        '  },');
});


module.exports = router;
