
exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments()
        tbl.string('project_name').notNullable().unique()
        tbl.text('project_desc')
        tbl.boolean('completed').defaultTo(false)
    })
    .createTable('resources', tbl => {
        tbl.increments()
        tbl.string('resource_name').notNullable().unique()
        tbl.text('resource_desc')
    })
    .createTable('tasks', tbl => {
        tbl.increments()
        tbl.text('task_desc').notNullable()
        tbl.text('notes')
        tbl.boolean('task_complete').defaultTo(false)
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
    })
    .createTable('project_resource', tbl => {
        tbl.increments()
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resource')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
