/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('fretes', table=>{
        table.increments('id').primary()
        table.integer('idProduto').unsigned().references('id')
            .inTable('produtos').notNull()
        table.string('nomeProduto').notNull()
        table.float('pesoProduto').notNull()
        table.integer('idVeiculo').unsigned().references('id')
            .inTable('veiculos').notNull()
        table.string('nomeVeiculo').notNull()
        table.float('pesoVeiculo').notNull()
        table.float('distancia').notNull()
        table.float('precoFrete').notNull()
        table.float('taxa').notNull()
        table.date('dataPostagem').notNull()
        table.string('status').notNull().defaultTo('Pendente')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('fretes')
};
