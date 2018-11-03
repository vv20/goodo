var express = require('express');
var router = express.Router({mergeParams: true, mergeBody: true});
var database = require('../database.js');

router.post('/signup', function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {
        database
            .signup(req.body.username, req.body.password)
            .then(user => {
                req.session.username = user.username;
                return res.send(200);
            }).catch(e => {
            return next(e);
        });
    } else {
        res.send(404);
    }
    // res.send('Signup - \n' +
    //     '  "signupDetails": {\n' +
    //     '    "username": ' + req.body.username + ',\n' +
    //     '    "password": ' + req.body.password + '\n' +
    //     '  }');
});


router.post('/login', function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {
        database
            .getUser(req.body.username)
            .then(user => {
                    if (user.password === req.body.password) {
                        req.session.username = user.username;
                        return res.send(200);
                    } else {
                        res.send(401);
                    }

                }
            ).catch(e => {
            return next(e);
        });
    } else {
        res.send(404);
    }
    /*res.send('Login - \n' +
        '  "loginDetails": {\n' +
        '    "username": ' + req.body.username + ',\n' +
        '    "password": ' + req.body.password + '\n' +
        '  },');*/
});


router.post('/signout', function (req, res, next) {
    req.session.destroy();
    res.send(200);
});


module.exports = router;
