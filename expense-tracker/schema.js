const mongoose = require('mongoose')

const expenseDetailsSchema = new mongoose.Schema({
    userid: {
        type: String
    },
    amount: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: String
    }
}, {
    versionKey: false
})

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

const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema)
const User = mongoose.model('UserDetails', userDetailsSchema)

module.exports = { Expense, User }