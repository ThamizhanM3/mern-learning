
var amount = document.querySelector('#amount')
var category = document.querySelector('#category')
var date = document.querySelector('#date')
var add = document.querySelector('#button')



async function getExpense() {
    const result = await fetch('https://expensetracker-xe83.onrender.com/get-expense')
    const data = await result.json()
    console.log(data)
}

getExpense()

async function addExpense(amount, category, date){
    
    const response = await fetch('https://expensetracker-xe83.onrender.com/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "amount": amount,
            "category": category,
            "date": date
        })
    })
    const data = await result.json()
    console.log(data)
}

add.addEventListener('click', () =>{
    var amount = document.querySelector('#amount')
    var category = document.querySelector('#category')
    var date = document.querySelector('#date')
    console.log('hello', amount.value, category.value, date.value)
    addExpense(amount.value, category.value, date.value)
    getExpense()
})

// Set Local Storage 
window.localStorage.setItem("a",2)