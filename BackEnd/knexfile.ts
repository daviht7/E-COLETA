import path from 'path'

module.exports = {
  client: 'pg',
  connection: {
    host : 'localhost',
    database : 'ecoleta',
    user:"postgres",
    password:"postgres",
    port:5432
  },
  migrations: {
    directory: path.resolve(__dirname,"src","database","migrations")
  },
  seeds: {
    directory: path.resolve(__dirname,"src","database","seeds")
  }
}