exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(table){
    table.increments();
    table.string('area');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
