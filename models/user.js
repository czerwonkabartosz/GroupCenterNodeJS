var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var db = require('./db');

var User = db.Model.extend({
    tableName: 'users',
    groups: function(){
        return this.belongsToMany(require('./group'), 'groups_users', 'group_id', 'user_id');
    }
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
    register: Promise.method(function (user) {
        user.created_at = new Date();
        user.updated_at = new Date();
        user.password = bcrypt.hashSync(user.password, 10);

        new User(user).save().then(function (model) {
            return model;
        });
    })

});

module.exports = User;