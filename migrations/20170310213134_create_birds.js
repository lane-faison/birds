exports.up = function(knex, Promise) {
  return knex.schema.createTable('bird', function(table){
    table.increments()
    table.integer('order')
    table.string('name')
    table.integer('location_id').references('location.id').notNullable().onDelete('cascade')
    table.integer('rating')
    table.dateTime('date').defaultTo(knex.fn.now())
    table.text('notes').nullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bird')
}
