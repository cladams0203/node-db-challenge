const router = require('express').Router()

const db = require('./projectsModal')

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

module.exports = router