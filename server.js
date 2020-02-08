const express = require('express')
const server = express()
const helmet = require('helmet')
const cors = require('cors')


server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req,res) => {
    res.status(200).json({message: 'welcome to the node db challenge'})
})

module.exports = server