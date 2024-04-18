const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    versionKey: false
})

const User = mongoose.model('UserDetails', userDetailsSchema)

module.exports = User