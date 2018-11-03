var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function (req, res, next) {
    // makerequest(req, res, next, "/project/all", "GET")
    //     .then((projects) => {
    //         return Promise.all(projects.map(d => makerequest(req, res, next, "/project/" + d.project_id + "/tag/all", "GET")))
    //     })
    //     .then(tags => {
    //         return Promise.all(projects.map(d => makerequest(req, res, next, "/project/" + d.project_id + "/flashcards/all", "GET"))).then(flashcards => {
    //             return {tags, flashcards}
    //         });
    //     })
    //     .then(value => [
    let projects = [
        project(1, "CS4052", 5, 10),
        project(2, "CS4099", 4, 10),
        project(3, "CS4303", 4, 10),
        project(4, "CS4203", 6, 10),
    ];

    res.render('projects', {
        title: 'Projects', projects
    })
    // ]);


});
const project = (id, name, tl, fl) => {
    return {
        id: id,
        name: name,
        tagsLength: tl,
        flashcardsLength: fl
    }
};

function makerequest(req, res, next, path, method) {
    return new Promise((resolve, reject) => {
        let headers = {
            'Cookie': req.cookies.name,
        };
        if (!req.cookies.name) {
            headers = {}
        }
        let results = '';

        const options = {
            hostname: 'vv20.host.cs.st-andrews.ac.uk',
            path: path,
            port: 3000,
            method: method,
            headers: headers
        };
        const request = http.request(options, (response) => {
            response.on('data', (chunk) => {
                results = results + chunk;
            });
            console.log("done");
            response.on('end', () => {
                console.log(String(results));
                const data = JSON.parse(results);
                console.log(JSON.stringify(data));
                resolve(data);
            });
        });

        request.end();
        request.on('error', (e) => {
            reject(e);
        })

    })
}

const getProjectInfo = () => {
};

module.exports = router;
