var express = require('express');
var router = express.Router();


router.post('/login', authenticate, function (req, res, next) {
    res.send('Login - \n' +
        '  "loginDetails": {\n' +
        '    "username": "username",\n' +
        '    "password": "hunter2"\n' +
        '  },');
});

router.post('/signup', authenticate, function (req, res, next) {
    res.send('Signup - \n' +
        '  "signupDetails": {\n' +
        '    "username": "username",\n' +
        '    "password": "hunter2"\n' +
        '  }');
});

router.post('/signout', authenticate, function (req, res, next) {
    req.session.destroy();
    res.send('Signed out');
});


function authenticate(req, res, next) {
    // if login.yes = true
    req.session.username = "mr yeet";
    return next();
}

module.exports = router;
