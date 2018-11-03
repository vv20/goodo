var express = require('express');
var router = express.Router({ mergeParams: true});
// var database = require('../database.js');


router.get('/all', function(req, res, next) {
    // database.getAllProjects(req.session.username);
    res.send('Getting all projects');
});

router.get('/:pid', function(req, res, next) {
    // database.getProject(req.params.pid);
    res.send('Getting project with pid: ' + req.params.pid);
});



router.post('/', function(req, res, next) {
    // database.makeProject(req.body.id, req.body.name);
    res.send('Updating project - \n' +
        '  "project": {\n' +
        '    "id": ' + req.body.id + ',\n' +
        '    "name": ' + req.body.name + '\n' +
        '  },');
});



router.put('/link', function(req, res, next) {
    // database.linkFlashcardToTag(req.body.tid, req.body.fid);
    res.send('Updating tid <-> fid link - \n' +
        '  "link": {\n' +
        '    "tid": ' + req.body.tid + ',\n' +
        '    "fid": ' + req.body.fid + '\n' +
        '  },');
});

router.put('/playlist', function(req, res, next) {
    // database.linkProjectToPlaylist(req.body.pid, req.body.playlistId);
    res.send('Updating pid <-> playlistId link - \n' +
        '  "playlist": {\n' +
        '      "pid": ' + req.body.pid + ',\n' +
        '      "playlistId": ' + req.body.playlistId + '\n' +
        '  }');
});


module.exports = router;
