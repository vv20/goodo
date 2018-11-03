var express = require('express');
var router = express.Router({ mergeParams: true});


router.get('/all', function(req, res, next) {
    res.send('Getting all projects');
});

router.get('/:pid', function(req, res, next) {
    res.send('Getting project with pid: ' + req.params.pid);
});



router.post('/', function(req, res, next) {
    res.send('Updating project - \n' +
        '  "project": {\n' +
        '    "id": "id",\n' +
        '    "name": "name"\n' +
        '  },');
});



router.put('/link', function(req, res, next) {
    res.send('Updating tid <-> fid link - \n' +
        '  "link": {\n' +
        '    "tig": "tagId",\n' +
        '    "fid": "flashcardId"\n' +
        '  },');
});

router.put('/playlist', function(req, res, next) {
    res.send('Updating pid <-> playlistId link - \n' +
        '  "playlist": {\n' +
        '      "pid": "projectId",\n' +
        '      "playlistId": "playlistId"\n' +
        '  }');
});


module.exports = router;
