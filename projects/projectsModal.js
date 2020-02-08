const db = require('../data/dbConfig')

module.exports = {
    find,
    findById,
    add
}

function find() {
    return db('projects')
}

function findById(id) {
    return db('project_resource')
        .join('projects', 'projects.id', 'project_id')
        .join('resources', 'resources.id', 'resource_id')
        .where('projects.id', id)
}

function add(project) {
    return db('projects').insert(project)
        .then((id) => id)
}

