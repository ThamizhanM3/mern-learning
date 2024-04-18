/**
 * Cookies
 * Session Storage
 * Local Storage
 * Cache
 * JWT
 * OAuth
 * Authentication / Authorization
 */


const express = require('express')

const app = express()

function customMiddleWare(request, response, next){
    console.log('Hio')
    next()
}

// app.use(customMiddleWare)

app.get('/', (request, response) => {
    response.send('Hello')
})

app.get('/q', customMiddleWare, (request, response) => {
    response.send('Hello')
})

app.get('/w', (request, response) => {
    response.send('Hello')
})

app.get('/e', (request, response) => {
    response.send('Hello')
})

app.get('/r', (request, response) => {
    response.send('Hello')
})


app.listen(8000, () => {
    console.log('Listening to port 8000')
})