/**
 * Functionalities of application
 * End Points
 * DB Connection
 * 
 */

/**
 * basic CRUD operations
 * adding new expense       => /add-expense     => post
 * view existing expense    => /get-expense     => get
 * edit existing entries    => /update-expense  => patch
 * delete exiting entries   => /delete-expense  => delete
 * 
 * create new user          => /add-user        => post
 * validate existing user   => /validate-user   => post
 * 
 * monthly analysis
 * 
 * DataBase      => Expense Tracker
 * Collection    => ExpenseDetails
    *                  amount   => Number
    *                  category => String
    *                  date     => String
    *               UserDetails
    *                   userName
    *                   emailId
    *                   password
 */

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { Expense, User } = require('./schema')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const connectToDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://Mithelesh:MitheleshM3@mithelesh01.yapjwgo.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Mithelesh01')
        const port = process.env.PORT || 8000
        app.listen(port, () => {
            console.log(`App is running on Port: ${port} 👍`)
        })
    } catch (error) {
        console.log(error)
        console.log('DataBase Connection not established 🤣 ')
    }
}

connectToDB()

console.log('Loading...')

app.post('/add-expense', async (request, response) => {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
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
})

app.get('/get-expense', async (request, response) => {
    try {
        const expenseDetails = await Expense.find()
        response.status(200).json(expenseDetails)
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Could not fetch data",
            "error": error
        })
    }
})

app.delete('/delete-expense/:id', async (request, response) => {
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
})

app.patch('/update-expense/:id', async (request, response) => {
    try {
        await Expense.findByIdAndUpdate(request.params.id, {
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
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
})

app.post('/add-user', async (requst, response) => {
    try {
        const user = await User.find({"email": requst.body.email})
        if (!user.length) {
            await User.create({
                "username": requst.body.username,
                "email": requst.body.email,
                "password": requst.body.password
            })
            response.status(201).json({
                "status": "Sucessful",
                "message": "New User Created"
            })
        } else {
            response.status(403).json({
                "status": "Failure",
                "message": "User already exists"
            })
        }
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "User not created",
            "error": error
        })
    }
})

app.post('/validate-user', async (request, response) => {
    try {
        const user = await User.find({"username": request.body.username})
        if (!user.length) {
            response.status(401).json({
                "status": "Failure",
                "message": "User Doesn't exist"
            })
        } else if (user[0].password === request.body.password) {
            response.status(200).json({
                "status": "Sucess",
                "message": "Login Sucessful"
            })
        } else {
            response.status(401).json({
                "status": "Failure",
                "message": "Invalid Password"
            })
        }
    } catch (error) {
        response.status(500).json({
            "status": "Failure",
            "message": "Login Unsucessful, Check console",
            "error": error
        })
    }
})