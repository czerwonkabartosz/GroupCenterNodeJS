var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var db = require('./db');

var Group = db.Model.extend({
    tableName: 'groups',
    users: function(){
        return this.belongsToMany(require('./user'), 'groups_users', 'user_id', 'group_id');
    }
});

module.exports = Group;