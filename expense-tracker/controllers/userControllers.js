const User = require('../models/User')
const jwt = require('jsonwebtoken')

const secretKey = "Hello"
function generateToken(userDetails) {
    return jwt.sign(userDetails, secretKey)
}

const createUser = async (requst, response) => {
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
}

const validateUser = async (request, response) => {
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
}

module.exports = { validateUser, createUser }