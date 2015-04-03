var express = require('express');
var router = express.Router();

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: 'group_center_node_db',
        posrt: 5432,
        user: 'bartoszczerwonka',
        password: ''
    }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'users'
}, {

    login: Promise.method(function (email, password) {
        if (!email || !password) throw new Error('Email and password are both required');
        return new this({email: email.toLowerCase().trim()}).fetch({require: true}).then(function (customer) {
            if (bcrypt.compareSync(password, customer.get('password'))) {
                return customer;
            }

            return null;
        });
    }),
    register: Promise.method(function(user){
        user.created_at = new Date();
        user.updated_at = new Date()
        user.password = bcrypt.hashSync(user.password, 10);

        new User(user).save().then(function (model) {
           return model;
        });
    })

});

router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.login(email, password).then(function (a) {
        if (a) {
            res.send('test');
        } else {
            res.send('no');
        }
    });
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
            User.register(user).then(function(user){
                res.redirect('/login');
            })
        }
    });
});

module.exports = router;
