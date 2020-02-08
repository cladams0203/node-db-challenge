const router = require('express').Router()

const db = require('./resourceModal')

router.get('/', (req,res) => {
    db.find()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to get resources'})
        })
})

router.post('/', (req,res) => {
    db.add(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to add resource'})
        })
})

router.post('/addproject', (req,res) => {
    db.addResourceToProject(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Failed to add resource to project'})
        })
})

module.exports = router