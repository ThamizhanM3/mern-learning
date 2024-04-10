loginData = document.querySelector("#loginFormSubmit");
userName = document.querySelector('#uname')
password = document.querySelector('#pass')

userData = []

fetch('../utils/users.json')
.then((res) => {
    return res.json()
})
.then((data) => {
    userData = [...data]
})


loginData.addEventListener("submit", (event) => {
    event.preventDefault()
    uname = userName.value
    pass = password.value
    OnLogin()
});

function loginUser(uname, pass) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(userData)
            const user = userData.find(
                (user) => user.uname === uname && user.pass === pass
            );
            if (user) {
                resolve(user);

            } else {
                reject(new Error("Invalid email or password"));
            }
        }, 1000);
    });
}

async function OnLogin() {
    try{
        const user = await loginUser (uname, pass);
        if (user){
            window.location.href="../../TaskManagement/index.html"
        }
    }
    catch{
        console.log('user');
        // window.location.href="../../index.html"
    }
}