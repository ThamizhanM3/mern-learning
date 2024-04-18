const Expense = require('../models/Expense')

const addExpense = async (request, response) => {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date,
            "userid": request.params.userid
        })
        response.status(201).json({
            "status": "Sucess",
            "message": "Entry Created Sucessfully"
        })
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Entry not Created",
            "error": error
        })
    }
}

const getExpense = async (request, response) => {
    try {
        const expenseDetails = await Expense.find({"userid": request.params.userid})
        response.status(200).json(expenseDetails)
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Could not fetch data",
            "error": error
        })
    }
}

const deleteExpense = async (request, response) => {
    try {
        await Expense.findByIdAndDelete(request.params.id)
        response.status(200).json({
            "status": "Sucess",
            "message": "Entry Deleted"
        })
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Entry Not Deleted",
            "error": error
        })
    }
}

const updateExpense = async (request, response) => {
    try {
        await Expense.findByIdAndUpdate(request.params.id, {
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date,
            "userid": request.body.userid
        })
        response.status(200).json({
            "status": "Sucess",
            "message": "Entry Updated Sucessfully"
        })
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Entry Not Updated",
            "error": error
        })
    }
}

module.exports = { addExpense, getExpense, deleteExpense, updateExpense }