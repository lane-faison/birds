const birds = require('../db/knex.js')
function Birds() {
  return knex('bird')
}
