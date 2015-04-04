var db = require('./db');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var Group = db.Model.extend({
    tableName: 'groups'
});

module.exports = Group;