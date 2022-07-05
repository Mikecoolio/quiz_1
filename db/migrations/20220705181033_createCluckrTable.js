/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.primary('id');
    table.increments('id');
    table.string('username');
    table.text('image_url');
    table.text('content');
    table.timestamp('created_at')
    table.timestamp('updated_at')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
