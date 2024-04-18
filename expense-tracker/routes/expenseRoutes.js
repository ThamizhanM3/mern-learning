const express = require('express')
const jwt = require('jsonwebtoken')
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expenseControllers')

const router = express.Router()

const secretKey = "Hello"
const authenticateToken = (request, response, next) => {
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

router.post('/new/:userid', authenticateToken, addExpense)

router.get('/all/:userid', authenticateToken, getExpense)

router.delete('/delete/:id', authenticateToken, deleteExpense)

router.patch('/update/:id', authenticateToken, updateExpense)

module.exports = router