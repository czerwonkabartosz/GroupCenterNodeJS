var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

router.post('/login', function(req, res, next){
   res.send('test');
});

router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

router.post('/register', function(req, res, next) {
    res.render('auth/register');
});

module.exports = router;
