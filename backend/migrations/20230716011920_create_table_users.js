/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull()
        table.string('password').notNull()
        table.string('perfil').notNull().defaultTo('motorista')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
