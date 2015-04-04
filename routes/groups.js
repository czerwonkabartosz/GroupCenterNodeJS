var express = require('express');
var router = express.Router();

router.get('/groups', function (req, res, next) {
    res.render('groups/list');
});

router.get('/groups/my', function (req, res, next) {
    res.render('groups/list', {title: 'My'});
});

router.get('/groups/create', function (req, res, next) {
    res.render('groups/create');
});

module.exports = router;
