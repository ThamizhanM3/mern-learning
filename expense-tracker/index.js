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
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { Expense, User } = require('./schema')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const secretKey = "Hello"

function generateToken(userDetails) {
    return jwt.sign(userDetails, secretKey)
}

function authenticateToken(request, response, next){
    console.log('authentication processing...');
    const authHeader = request.headers.authorization
    const accessToken = authHeader && authHeader.split(' ')[1]
    console.log(authHeader);
    if (accessToken) {
        jwt.verify(accessToken, secretKey, (error, userDetails) => {
            if (error) {
                response.status(403).json({
                    "status": "Failure",
                    "message": "Access Denied"
                })
            } else {
                next()
            }
        })
    } else {
        response.status(401).json({
            "status": "Failure",
            "message": "Not Authorized"
        })
    }
    console.log(accessToken);
}

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

app.post('/add-expense/:userid', authenticateToken, async (request, response) => {
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
})

app.get('/get-expense/:userid', authenticateToken, async (request, response) => {
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
})

app.delete('/delete-expense/:id', authenticateToken, async (request, response) => {
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

app.patch('/update-expense/:id', authenticateToken, async (request, response) => {
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
})

app.post('/add-user', async (requst, response) => {
    try {
        const user = await User.find({"email": requst.body.email})
        if (!user.length) {
            const user = await User.create({
                "username": requst.body.username,
                "email": requst.body.email,
                "password": requst.body.password
            })
            console.log(user);
            const userDetails = {
                "username": user.username,
                "email": user.email,
                "userid": user._id.toString()
            }
            const accessToken = generateToken(userDetails)
            response.status(201).json({
                "status": "Sucessful",
                "message": "New User Created",
                "asscessTokken": accessToken,
                "userdetails": userDetails
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
        console.log(error)
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
            const userDetails = {
                "username": user[0].username,
                "email": user[0].email,
                "userid": user[0]._id.toString()
            }
            const accessToken = generateToken(userDetails)
            response.status(200).json({
                "status": "Sucess",
                "message": "Login Sucessful",
                "asscessTokken": accessToken,
                "userdetails": userDetails
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