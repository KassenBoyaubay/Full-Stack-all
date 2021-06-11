import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'

function Login() {

    // redirect url
    let history = useHistory()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        const data = { username, password }
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            console.log(response.data)
            if (response.data === "You Logged In") history.push('/')
        })
    }

    return (
        <div className="loginContainer">
            <input type="text" className="login" onChange={(event) => { setUsername(event.target.value) }} />
            <input type="password" className="password" onChange={(event) => { setPassword(event.target.value) }} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
