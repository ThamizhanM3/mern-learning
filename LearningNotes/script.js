console.log("Hello02");

ele = document.querySelector('h1')
btn = document.querySelector('#newButton')

function addition(a, b){
    return a+b
}

a = () => {
    arr.map((nums) => {
        console.log(nums)
    })
    for (i of arr){
        console.log( "of: " +  i)
    }
    for(i in arr){
        console.log("in: " + i)
    }
    for(i of arrob){
        console.log(i.name)
    }
    arrob.map((ele) => {
        console.log(ele.name + " " + ele.age)
    })
    arrob.filter((ele) => {return ele.age < 45}).map((ele) => {console.log(ele.name + " " + ele.age)})
    res = arrob.find((ele) => {return ele.age < 45})
    console.log(res)
};

var arr = [10, 20, 30, 40, 50]

btn.addEventListener('click', () => {
    console.log("clicked");
    ele.textContent = 'Hello';
    document.querySelector('#newButton').classList.add('button');
    console.log(addition(addition(2, 3), addition(4, 5)))
    console.log()
    a()
});



arrob = [
    {
        name: 'Name1',
        age: '10'
    },
    {
        name: 'Name2',
        age: '20'
    },
    {
        name: 'Name3',
        age: '30'
    },
    {
        name: 'Name4',
        age: '40'
    },
    {
        name: 'Name5',
        age: '50'
    },
    {
        name: 'Name6',
        age: '60'
    }
]


context = []

function loadData(category, subCategory, duration, task){
    context.push(
        {
            category: category,
            subCategory: subCategory,
            duration: duration,
            task: task
        }
    )
}

document.querySelector('#loading')
.addEventListener('click', () => {
    console.log("loading")
    loadData('Work', 'Meet', '40', 'Client')
    loadData('Personal', '-', '26', '-')
    loadData('Work', 'Project', '132', 'Mail')
    loadData('Work', 'Meet', '35', 'Daily')
    loadData('Personal', '-', '16', '-')
    loadData('Work', 'Meet', '42', 'Documentation')
})

document.querySelector('#display')
.addEventListener('click', () => {
    console.log("hi")
    tbody = document.querySelector('#table01 tbody')
    rows = context.map((ele) => {
        console.log(ele.category + " " + ele.subCategory + " " + ele.duration + " " + ele.task)
        row = document.createElement('tr')

        cell1 = document.createElement('td')
        cell1.textContent = ele.category
        row.appendChild(cell1)
        
        cell2 = document.createElement('td')
        cell2.textContent = ele.subCategory
        row.appendChild(cell2)
        
        cell3 = document.createElement('td')
        cell3.textContent = ele.duration
        row.appendChild(cell3)
        
        cell4 = document.createElement('td')
        cell4.textContent = ele.task
        row.appendChild(cell4)

        return row
    })

    rows.forEach(element => {
        tbody.appendChild(element)
    });
})

inputGiven = []
arrayopt = ''

document.querySelector('#inputButton')
.addEventListener('click', () => {
    inputGiven.push(document.querySelector('#newInput').value)
    document.querySelector('#newInput').value = ''
})

document.querySelector('#displayInput')
.addEventListener('click', () => {
    arrayopt = ''
    console.log(inputGiven)
    inputGiven.map((ele) => {
        arrayopt += ele + `/n`
    })
    document.querySelector('#inputGiven').textContent = arrayopt 
})

timemin = 0
timesec = 0
timing = 0

timer = setInterval(() => {
    console.log('started')
    timing += 1
    timesec = timing %60
    timemin = parseInt(timing / 60)
    document.querySelector('h1').textContent = timemin + ":" + timesec
}, 1000)

// setTimeout(() => {
//     clearInterval(timer)
//     console.log('ended')
// }, 10000)