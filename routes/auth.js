var express = require('express');
var router = express.Router();

var User = require('./../models/user');

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/login', function (req, res, next) {

    req.assert('email', 'A valid email is required').isEmail();
    req.assert('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('auth/login', {
            errors: errors
        });
    } else {

        var email = req.body.email;
        var password = req.body.password;

        User.login(email, password).then(function (a) {
            if (a) {
                res.send('test');
            } else {
                res.send('no');
            }
        });
    }
});

router.get('/register', function (req, res, next) {
    res.render('auth/register');
});

router.post('/register', function (req, res, next) {

    var user = req.body;

    new User({email: user.email}).fetch().then(function (users) {
        if (users) {
            res.end();
        } else {
            User.register(user).then(function (user) {
                res.redirect('/login');
            })
        }
    });
});

module.exports = router;
