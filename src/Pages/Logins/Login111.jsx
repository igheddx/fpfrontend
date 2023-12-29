

import React, { useState, useEffect } from "react";
import index2 from './index2.css'
import useBearStore from "../../state/state";

function Login00 (props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const tempLoginUsers = [
        {
            userName: "richard@me.com",
            password: "richard@1",
        },
        {
            userName: "dominic@me.com",
            password: "dominic@1"
        },
    ];

    
  
    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log(userName);
    }

    const setIsUserValid = useBearStore((state) => state.setIsUserValid);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    //const { username, password, remember} = formData;
    //const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("username  " +  userName)
        console.log("password " +  password)
        
        const checkUser = tempLoginUsers.filter(login => login.userName === userName && login.password == password);

        
        console.log("will be know thwe status= " + checkUser.map(user => user.userName))
        const isVerified = checkUser.map(user => user.userName)
        if (isVerified != ""){
            console.log("authorized")
            setIsUserValid(true);
        } else {
            console.log("NOT authorized")
            setIsUserValid(false);
        }

       
        const dbPassword = "testtest";
        console.log("username asdfasdfsd= " + userName)
        console.log("password = " + password)
        // ... do something with email
    }

    const onFinish = (e)=> {
        
       
       
    }


    return (
        <div>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit} onFinish={onFinish}>
                <label htmlFor="email">email</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="email" placeholder="youremail@gmail.com" id="userName" name="userName" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" htmlType="submit" >Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>



    )
}

export default Login00;