var express = require('express');
var router = express.Router();

var React = require('react');
var path = require('path');

var User = require('./../models/user');


require('node-jsx').install();

router.get('/profile', function(req, res, next) {

  new User({id: req.user.id}).fetch().then(function(user){
    res.render('user/profile', user.toJSON());
  });
});

module.exports = router;
