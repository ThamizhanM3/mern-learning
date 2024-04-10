timerStatus = false
timehr = 0
timemin = 0
timesec = 0
timing = 0
context = []

tbody = document.querySelector('.tableContent')
startStopBtn = document.querySelector('#start');
resetBtn = document.querySelector('#reset')
timerCount = document.querySelector('#timer')
addTask = document.querySelector('#addTask')
category = document.querySelector('#category')
subCategory = document.querySelector('#subCategory')
task = document.querySelector('#task')
notes = document.querySelector('#notes')

displayTime = `${timehr.toString().padStart(2, '0')} : ${timemin.toString().padStart(2, '0')} : ${timesec.toString().padStart(2, '0')}` 
timerCount.textContent = displayTime

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

loadData('Work', 'Meet', '00 : 40 : 00', 'Client')
loadData('Personal', '-', '00 : 26 : 00', '-')
loadData('Work', 'Project', '01 : 32 : 00', 'Mail')
loadData('Work', 'Meet', '00 : 35 : 00', 'Daily')
loadData('Personal', '-', '00 : 16 : 00', '-')
loadData('Work', 'Meet', '00 : 42 : 00', 'Documentation')


rows = context.map((ele) => {
    console.log(ele.category + " " + ele.subCategory + " " + ele.duration + " " + ele.task)
    row = document.createElement('div')
    row.className = 'tableRow'
    
    cell1 = document.createElement('div')
    cell1.className = 'category'
    cell1.textContent = ele.category
    row.appendChild(cell1)
    
    cell2 = document.createElement('div')
    cell2.className = 'subCategory'
    cell2.textContent = ele.subCategory
    row.appendChild(cell2)
    
    cell3 = document.createElement('div')
    cell3.className = 'duration'
    cell3.textContent = ele.duration
    row.appendChild(cell3)
    
    cell4 = document.createElement('div')
    cell4.className = "task"
    cell4.textContent = ele.task
    row.appendChild(cell4)
    
    return row
})
rows.forEach(element => {
    tbody.appendChild(element)
});

function displayTable(){
    row = document.createElement('div')
    row.className = 'tableRow'
    
    cell1 = document.createElement('div')
    cell1.className = 'category'
    cell1.textContent = category.value
    row.appendChild(cell1)
    
    cell2 = document.createElement('div')
    cell2.className = 'subCategory'
    cell2.textContent = subCategory.value
    row.appendChild(cell2)
    
    cell3 = document.createElement('div')
    cell3.className = 'duration'
    cell3.textContent = displayTime
    row.appendChild(cell3)
    
    cell4 = document.createElement('div')
    cell4.className = "task"
    cell4.textContent = task.value
    row.appendChild(cell4)
    
    tbody.appendChild(row)
}

function resetTasks(){
    timehr = 0
    timemin = 0
    timesec = 0
    subCategory.value = ''
    task.value = ''
    notes.value = ''
    displayTime = `${timehr.toString().padStart(2, '0')} : ${timemin.toString().padStart(2, '0')} : ${timesec.toString().padStart(2, '0')}`
    timerCount.textContent = displayTime
}

startStopBtn.addEventListener('click', () => {
    if(!timerStatus){
        timerStatus = true
        
        timer = setInterval(() => {
            console.log('started')
            timing += 1
            timesec = timing %60
            timemin = parseInt(timing / 60)
            displayTime = `${timehr.toString().padStart(2, '0')} : ${timemin.toString().padStart(2, '0')} : ${timesec.toString().padStart(2, '0')}`
            timerCount.textContent = displayTime
        }, 1000)
        startStopBtn.textContent = 'Stop'
    }
    else{
        clearInterval(timer)
        timerStatus = false
        startStopBtn.textContent = 'Start'
    }
})


resetBtn.addEventListener('click',  () => {
    resetTasks()
})

addTask.addEventListener('click', () => {
    loadData(category.value, subCategory.value, displayTime, task.value)
    displayTable()
    resetTasks()
})