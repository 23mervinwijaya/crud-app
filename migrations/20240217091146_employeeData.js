/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('data_pegawai',(table)=>{
        table.increments();
        table.string('nama_pegawai');
        table.string('job_level');
        table.string('tanggal_lahir')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('data_pegawai')
  
};
