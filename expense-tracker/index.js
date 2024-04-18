const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const expenseRoutes = require('./routes/expenseRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/expense', expenseRoutes)
app.use('/user', userRoutes)


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