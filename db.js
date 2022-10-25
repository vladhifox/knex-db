const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user : 'intern',
    //user: 'postgres',
    password : '123450',
    //password: '123',
    database: 'todolist'
  }
});

module.exports = knex;
