
import React from 'react';
import { Button, Checkbox, Form, Input, Spin, Alert, Space  } from 'antd';
import {useState, useEffect} from "react";
import useBearStore from "../../state/state";
import { Link, useNavigate } from "react-router-dom";

import index2 from './index2.css'
import axios from "axios";
import CryptoJS from 'crypto-js';

function Login1() {

    if (localStorage.getItem("profile") != null){
        localStorage.removeItem("profile")
    }
    const profileStruct ={
        customerid: 0,
        cloudCustomerId: null,
        profileid: 0,
        profileUUID: null,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        success: null,
    }
    const setIsUserValid = useBearStore((state) => state.setIsUserValid);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState({username: "", password: ""})
    const [APIKey, setAPIKey] = useState('')
    const [loginAPIResponse, setLoginAPIResponse] = useState(profileStruct)
    const [loading, setLoading] = useState(false)
    const [buttonName, setButtonName] = useState("Sign In")

    useEffect(() => {
        // Update the document title using the browser API
        // if (loginAPIResponse.success == true) {
        //     setButtonName("Authenticating...")
        // } else {
        //     setButtonName("Sign In")
        // }
        
      });

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
    

    const tempLoginUsers = [
      {
          userName: "richard@me.com",
          password: "richard@1",
      },
      {
          userName: "dominic@me.com",
          password: "dominic@1"
      },
      {
        userName: "johntravolta",
        password: "pass1234"
      },
      {
        userName: "igheddx",
        password: "pass1234"
      }
  ];
  const processLogin = (event) => {
    //event.preventDefault();

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

    const  makePostAPICalls = async () => {
        setIsUserValid(false)
        setLoading(true)
        setButtonName("Authenticating...")
        await API.post("/api/Customer/authenticate/", {
            username: userName,
            password: password
        }).then((res) => {
            console.log("what is the status = " + res.status)
            setLoginAPIResponse(res.data);
            
            console.log("status == " + res.status);
            console.log("data = " + res.data)
        }).catch((err) => {
            //setLoginAPIResponse(err);
            console.log("failed status == " + err.status);
        }).finally(() => {
     
            setLoading(false)
            setButtonName("Sign In")
            
        });
    };

  

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log("Finish username :" + userName)
        console.log("Finish password :" + password)
        
        makePostAPICalls();
        processLogin();
       
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    
    
    const handleSubmit =(e) => {
        e.preventDefault();
        console.log("username = " + userName)
    }
    return (
        <>
        {/* <Spin spinning={loading} tip="Authenticating..."> */}
        <div className="auth-form-container">
        {loginAPIResponse.success == true? setIsUserValid(true): setIsUserValid(false) }
        {
            localStorage.setItem("firstName", loginAPIResponse.firstName)
        }

        {/* capture user profile locally*/}
        {localStorage.setItem("profile1", JSON.stringify({
                firstName: loginAPIResponse.firstName,
                lastName: loginAPIResponse.lastName,
                customerid: loginAPIResponse.customerid,
                cloudCustomerId: loginAPIResponse.cloudCustomerId,
                profileid: loginAPIResponse.profileid,
                profileUUID: loginAPIResponse.profileUUID,
                token: loginAPIResponse.token,
            })
            )
        }

        {loginAPIResponse.success == null? 
            <Space
                direction="vertical"
                align='center'
                style={{
                    width: '25%',
                }}
            >
                <Alert 
                    message="Warning" 
                    type="warning" 
                    showIcon 
                    closable 
                    style={{
                        maxWidth: 400,
                }}/> 
            </Space>: ''}
        
        {/* {{loginAPIResponse.success == true? '': setButtonName("Authenticating...")}} */}
       

        <p><div style={{ color: "red"}}>{loading? "Authenticating, please wait...": ''}</div></p>
        
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 400,
        }}
        initialValues={{

          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onSubmit = {processLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
        >
          <Input   />
        </Form.Item>
    
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
    
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" 
          loading={loading} htmlType='submit'>
            {buttonName}
          </Button>
          <div></div>
        </Form.Item>
      </Form>
      </div>
     
      {/* </Spin> */}
      </>
      )
 
};
export default Login1;