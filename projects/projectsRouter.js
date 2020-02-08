const router = require('express').Router()

const db = require('./projectsModal')
const taskDb = require('../tasks/tasksModal')

router.get('/', (req,res) => {
    db.find()
        .then(list => {
            res.status(200).json(list.map(item => {
                return {...item, completed: item.completed ? true : false}
            }))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get projects'})
        })
})

router.post('/', (req,res) => {
    db.add(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to add project'})
        })
})
router.get('/:id', (req,res) => {
    const id = req.params.id
    db.findById(id)
        .then(project => {
            const {project_id, project_name, project_desc, completed} = project[0]
            const resourceList = project.map(item => {
                const {resource_id, resource_name, resource_desc} = item
                return {resource_id, resource_name, resource_desc}
            })
            const projectComplete = completed ? true : false
            taskDb.findByProjectId(id)
                .then(list => {
                    res.status(200).json({
                            id: project_id,
                            project_name,
                            project_desc,
                            completed: projectComplete,
                            tasks: list.map(item => {
                                return {...item, task_complete: item.task_complete ? true : false}
                            }),
                            resources: resourceList
                        })
                })
        })
})

module.exports = router