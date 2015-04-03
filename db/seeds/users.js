'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),

        // Inserts seed entries
        knex('users').insert({
            'first_name' : 'test',
            'last_name' : 'test',
            'email' : 'email',
            'password': '',
            salt:'',
            created_at: new Date(),
            updated_at: new Date()
        })
    );
};