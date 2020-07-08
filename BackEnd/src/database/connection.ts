import knex from 'knex';

const connection = knex({
  client: 'mssql',
  connection: {
    host : 'DESKTOP-MVQ9KDC\MSSQLSERVER01',
    database : 'ecoleta'
  }
})

export default connection;