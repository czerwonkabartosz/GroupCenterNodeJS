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

module.exports = bookshelf;