import React, { useState } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState('');

    const [cookie, setCookie] = useCookies([])
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const loginResponse = await fetch("http://localhost:8000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: uname,
                    password
                }),
            })

            const loginData = await loginResponse.json()

            if (loginData.status === 'Failure') {
                alert(loginData.message)
            } else {
                console.log(loginData);
                setCookie('token', loginData.accessToken)
                setCookie('userdetails', loginData.userdetails)
                navigate('/expense')
            }
        } catch (error) {
            console.log('API Error');
        }
    }

    const handleUname = (e) => {
        setUname(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='Login'>
            <form action="" id="loginFormSubmit" onSubmit={handleSubmit}>
                <div className="loginForm">
                    <div className="header">
                        <h2>Login</h2>
                    </div>
                    <div className="inputs">
                        <input type="text" name="uname" id="uname" placeholder="User Name" onChange={handleUname} value={uname} />
                        <input type="password" name="pass" id="pass" placeholder="Password" onChange={handlePassword} value={password} />
                    </div>
                    <div className="footer">
                        <button type="submit" id="login">Login</button>
                        <h6>Don't have an account? <a href="../expense">Sign Up</a> </h6>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
