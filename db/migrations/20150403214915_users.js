'use strict';

exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (t) {
        t.increments().primary();
        t.string('first_name').notNull();
        t.string('last_name').notNull();
        t.string('email').nullable();
        t.string('password').nullable();
        t.string('salt').nullable();
        t.dateTime('created_at').notNull();
        t.dateTime('updated_at').nullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
