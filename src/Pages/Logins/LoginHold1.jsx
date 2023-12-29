
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {useState, useEffect} from "react";
import useBearStore from "../../state/state";
import { Link, useNavigate } from "react-router-dom";

import index2 from './index2.css'
import axios from "axios";
import CryptoJS from 'crypto-js';


function Login() {

    const setIsUserValid = useBearStore((state) => state.setIsUserValid);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState({username: "", password: ""})
    const [APIKey, setAPIKey] = useState('')
    //const [loginAPIResponse, setLoginAPIResponse] = useState(profileData)
    const [loading, setLoading] = useState(false)

    const API =  axios.create({
        timeout: 20000,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': '',
            'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
        },
        // method: "GET",
        // url: `/api/Resource/all/5/1`,

    });

    API.interceptors.request.use(function(config){
        //do stuff in here
        //setLoading(true)
        return config
    }, function(error) {
        return Promise.reject(error);
    });

    API.interceptors.response.use(function(response){
        //do stuff in here
        //setLoading(false)
        return response
    }, function(error) {
        return Promise.reject(error);
    });
    

    const makePostAPICalls=() => {
        setLoading(true)
        API.post("/api/Customer/authenticate/", {
            username: "johntravolta",
            password: "pass1234"
        }).then((res) => {
            //setLoginAPIResponse(res.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
            //setLoginAPIResponse());
            //const isVerified = checkUser.map(user => user.userName)
            if (res.status == "200") {
                console.log("authorized")
                setIsUserValid(true);
            } else {
                console.log("NOT authorized")
                setIsUserValid(false);
            }
            console.log("status == " + res.status);
            console.log("data = " + res.data)
        }).catch((err) => {
            //setLoginAPIResponse(err);
            console.log("failed status == " + err.status);
        }).finally(() => {
            setLoading(false)
        });
    };

    const handleSubmit = (event) => {
        console.log("username  " +  userName)
        event.preventDefault(); 
        makePostAPICalls();

        
        // ... do something with email
    }

    const getEncryption=() => {
        const data = '8216EB35-BB77-49AD-94CA-A7C3520DC464';
        const iv = 'F5cEUty4UwQL2EyW';
        const key = 'CHqcPp7MN3mTY3nF6TWHdG8dHPVSgJBj';

        const fkey = CryptoJS.enc.Utf8.parse(key);
        const fiv = CryptoJS.enc.Utf8.parse(iv);

        const enc = CryptoJS.AES.encrypt(data, fkey, {
                iv: fiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
        });

        const final = enc.ciphertext.toString(CryptoJS.enc.Base64);
        setAPIKey(final);

        console.log("my encryption = " + final )
    };
    
    const onFinish = (e)=> {
    
    }

   
    return (
        <div className="auth-form-container">
            <Form
                className="login-form"
                onSubmit={handleSubmit}
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
               
                <Input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="youremail@gmail.com"  name="userName" />

                </Form.Item>

                <Form.Item
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********"  name="password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit"  >
                    Login
                </Button>
                </Form.Item>
            </Form>
        </div>
   
    )
}

export default Login;