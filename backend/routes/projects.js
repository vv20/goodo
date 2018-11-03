var express = require('express');
var router = express.Router({ mergeParams: true});
var database = require('../database.js');


/* GET all projects */
router.get('/all', function(req, res, next) {
    database.getAllProjects(req.session.username).then(function(projects) {
        res.send(projects);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Getting all projects');
});


/* GET project of specific pid */
router.get('/:pid', function(req, res, next) {
    database.getProject(req.params.pid).then(function(project) {
        res.send(project);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Getting project with pid: ' + req.params.pid);
});



/* POST new project */
router.post('/', function(req, res, next) {
    database.makeProject(req.session.username, req.body.name).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Updating project - \n' +
    //     '  "project": {\n' +
    //     '    "name": ' + req.body.name + '\n' +
    //     '  },');
});



/* PUT new link between flashcard and tag */
router.put('/link', function(req, res, next) {
    database.linkFlashcardToTag(req.body.tid, req.body.fid).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Updating tid <-> fid link - \n' +
    //     '  "link": {\n' +
    //     '    "tid": ' + req.body.tid + ',\n' +
    //     '    "fid": ' + req.body.fid + '\n' +
    //     '  },');
});

/* PUT new link between project and playlist */
router.put('/playlist', function(req, res, next) {
    database.linkProjectToPlaylist(req.body.pid, req.body.playlistId).then(function() {
        res.send(200);
    }).catch(function (err) {
        next(err);
    });
    // res.send('Updating pid <-> playlistId link - \n' +
    //     '  "playlist": {\n' +
    //     '      "pid": ' + req.body.pid + ',\n' +
    //     '      "playlistId": ' + req.body.playlistId + '\n' +
    //     '  }');
});


module.exports = router;
