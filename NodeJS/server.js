const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/validation', (req, res) => {
    user = req.body
    if (user.name === 'abcd' && user.pass === '0000') {
        // res.send('Valid User')
        responding = {
            "name": "MyName",
            "data": "MyData"
        }
        statusCode = 200
        // res.json(responding)
        console.log('User is Valid')
    } else {
        responding = {
            "name": "noName",
            "data": "noData"
        }
        statusCode = 400
        // res.send('Invalid User')
        console.log('User is Invalid')
    }
    res.status(statusCode).json(responding)
    // res.send('posting validate')
})

app.listen(4000, () => {
    console.log('Listening to Port: 4000')
})