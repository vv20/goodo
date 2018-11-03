var express = require('express');
var router = express.Router({ mergeParams: true, mergeBody: true});
// var database = require('../database.js');


router.post('/signup', authenticate, function (req, res, next) {
    res.send('Signup - \n' +
        '  "signupDetails": {\n' +
        '    "username": ' + req.body.username + ',\n' +
        '    "password": ' + req.body.password + '\n' +
        '  }');
});


router.post('/login', authenticate, function (req, res, next) {
    res.send('Login - \n' +
        '  "loginDetails": {\n' +
        '    "username": ' + req.body.username + ',\n' +
        '    "password": ' + req.body.password + '\n' +
        '  },');
});


router.post('/signout', authenticate, function (req, res, next) {
    req.session.destroy();
    res.send('Signed out');
});


function authenticate(req, res, next) {
    // if login.yes = true
    req.session.username = req.body.username;
    return next();
}

module.exports = router;
