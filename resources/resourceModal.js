const db = require('../data/dbConfig')

module.exports = {
    find,
    add,
    addResourceToProject
}

function find() {
    return db('resources')
}

function add(resource) {
    return db('resources').insert(resource)
        .then(([id]) => id)
}

function addResourceToProject(input) {
    return db('project_resource').insert(input)
        .then(([id]) => id)
}