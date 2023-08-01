/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('historicos', table=>{
        table.increments('id').primary()
        table.integer('idFrete').unsigned().references('id')
            .inTable('fretes').notNull()
        table.integer('idUsuario').unsigned().references('id')
            .inTable('users').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('historicos')
  
};
