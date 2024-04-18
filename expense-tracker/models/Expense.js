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

const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema)

module.exports = Expense