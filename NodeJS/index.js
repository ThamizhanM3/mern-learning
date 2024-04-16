const fs = require('fs')

// const file = fs.readFileSync('./data.json')
// console.log(file)

// const data = JSON.parse(file)
// console.log(data)

// data.myname = "New Name 2.0"

// fs.writeFileSync('./data.json', JSON.stringify(data))

// console.log(data)

fs.readFile('./data.json', (error, file) => {
    const data = JSON.parse(file)
    console.log(data)
})