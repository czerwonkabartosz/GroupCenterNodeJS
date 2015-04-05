'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('groups_users', function (t) {
        t.integer('user_id')
            .references('id')
            .inTable('users');
        t.integer('group_id')
            .references('id')
            .inTable('groups');
        t.primary(['user_id', 'group_id'])
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('groups_users');
};
