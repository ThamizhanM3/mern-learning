/**
 * basic CRUD operations
 * adding new expense       => /add-expense     => post
 * view existing expense    => /get-expense     => get
 * edit existing entries    => /update-expense  => patch
 * delete exiting entries   => /delete-expense  => delete
 * 
 * create new user
 * validate existing user
 * 
 * monthly analysis
 */

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const connectToDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://Mithelesh:MitheleshM3@mithelesh01.yapjwgo.mongodb.net/?retryWrites=true&w=majority&appName=Mithelesh01')
        app.listen(8000, () => {
            console.log('App is running on Port: 8000 👍')
        })
    } catch (error) {
        console.log(error)
        console.log('DataBase Connection not established 🤣 ')
    }
}

// const connectToDB = () =>{
//     mongoose.connect('mongodb+srv://Mithelesh:MitheleshM3@mithelesh01.yapjwgo.mongodb.net/?retryWrites=true&w=majority&appName=Mithelesh01')
//     .then(() => {
//         app.listen(8000, () => {
//             console.log('App is running on Port: 8000')
//         })
//     })
// }

connectToDB()

// app.get('/', (req, res) => {
//     respond = {
//         "message": "Welcome to Port: 8000"
//     }
//     statusCode = 200 n
//     res.status(statusCode).json(respond)
// })

console.log('Loading...')