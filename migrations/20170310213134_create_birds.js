exports.up = function(knex, Promise) {
  return knex.schema.createTable('bird', function(table){
    table.increments()
    table.string('name')
    table.integer('location_id').references('location.id')
    table.integer('rating')
    table.dateTime('date').defaultTo(knex.fn.now())
    table.text('notes')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bird')
}
