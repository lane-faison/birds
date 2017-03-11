module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/birds'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
