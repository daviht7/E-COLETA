import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    database : 'ecoleta',
    user:"postgres",
    password:"postgres",
    port:5432
  }
})

export default connection;