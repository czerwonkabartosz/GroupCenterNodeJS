var express = require('express');
var router = express.Router();

var Group = require('./../models/group');

router.get('/groups', function (req, res, next) {
    Group.fetchAll().then(function (groups) {
        res.render('groups/list', {groups: groups.toJSON()});
    });


    //Group.fetch({withRelated: ['author']}).then(function(book) {
    //    console.log(JSON.stringify(book.related('author')));
    //});


});

router.get('/groups/my', function (req, res, next) {
    res.render('groups/list', {title: 'My'});
});

router.get('/groups/:id([0-9]+)', function (req, res, next) {
    Group.where({id:req.params.id}).fetch({withRelated: ['users']}).then(function (group) {
        res.render('groups/group', {group: group.toJSON()});
    });
});

router.get('/groups/create', function (req, res, next) {
    res.render('groups/create');
});

router.post('/groups/create', function (req, res, next) {

    var group = req.body;
    group.created_at = new Date();
    group.updated_at = new Date();

    new Group(group).save().then(function (model) {

        model.users().attach(req.user.id);

        res.redirect('/groups');
    });


});

module.exports = router;
