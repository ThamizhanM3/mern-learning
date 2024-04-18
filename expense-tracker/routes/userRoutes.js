const express = require('express')
const { validateUser, createUser } = require('../controllers/userControllers')



const router = express.Router()

router.post('/new', createUser)

router.post('/login', validateUser)

module.exports = router