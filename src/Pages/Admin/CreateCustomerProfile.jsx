import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Typography, Alert } from "antd";
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../Store';
import useEncryptDecrypt from '../../API/useEncryptDescrypt';
import axios from "axios";
import useBearStore from "../../state/state";
import useStore from "../../state/state";
import '../../App.css';

function CreateCustomerProfile() {

  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState();
  const [cloudId, setCloudId] = useState();
  const [role, setRole] = useState('');
  const [registerProfile, setRegisterProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(Context);
  const [resCode, setResCode] = useState(0);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const customerCloudAccount = [
    {
      id: 1,
      label:  "AWS0001"
    },
    {
      id: 2,
      label:  "AWS0002"
    },
    {
      id: 3,
      label:  "AWS0003"
    },
  ];

  const accountRoles = [
    {
      id: "viewer",
      label:  "Viewer"
    },
    {
      id: "approver",
      label:  "Approver"
    },
    {
      id: "admin",
      label:  "Admin"
    },
    {
      id: "superAdmin",
      label:  "Super Admin"
    },
  ];

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


  const API = axios.create({
  });
  const createProfile  = async (e) => {
    e.preventDefault();

    console.log("first name = " + firstName)
    console.log("last name = " + lastName)
    console.log("email = " + email)
    
    console.log("ROLE = " + role)
    console.log("cloudId = " + cloudId)

    setLoading(true)
    let response = await API.post('http://localhost:3000/profile', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      title: title,
      username: email,
      password: password,
      role: role,
      profileUuid: uuidv4(),
      customerId: state.customerId,
      accessToken: "",
      refreshToken: "",
      tokenIssuesAt: "",
      tokenExpiredAt: "",
      cloudAccountId: cloudId,
      status: "pending"
    }).catch((err) => {
        setRegisterProfile(err);
        console.log("failed status == " + JSON.stringify(err.response.data));
    }).finally(() => {
        setLoading(false)
    });
    
    
    setRegisterProfile(response.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
    //setLoginAPIResponse());
    setResCode(response.status)
    
    console.log("create profile status == " + response.status);
    console.log("data = " + response.data)

    cleanup(response.status); 
    

  }
  

   

  const cleanup = (code) => {
    console.log("I was called = and the success code = ", code)
    if (code> 200 && code < 299) {
      console.log("I am between 201 and 299", code)

          
        
          setIsUpdateSuccess(true);
         
          
          console.log("Is updated success ", isUpdateSuccess)
          form.resetFields();
          window.scrollTo(0,0);
    }
  }

  const clearFields = () => {
    console.log("email before=", email)
    form.resetFields();
  
  }

  const clearAlert = () => {
    setIsUpdateSuccess(false)
  }
  // const onFinish = (values) => {
  //   setTimeout(() => {
  //     form.resetFields();
  //   }, 500)
   
  // }
  const handleChange = (e) => {
    //this.setState({id:e.value, name:e.label})
    setCloudId(e)
   
    //console.log("cloudId = " + e)
   }
   
   const handleChange2 = (e) => {
    //this.setState({id:e.value, name:e.label})
    console.log("role was selected " + e)
    setRole(e)
    //console.log("role = " + e)

   }
  return (
    <>
        <Typography.Title level={5}>Create Profile </Typography.Title>
        {isUpdateSuccess ==true ? 
                <><Alert message="Your request was successfully submitted." type="success" /> <br></br></>: "" }
            
        <Form
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 13 }}
          //onFinish={onFinish}
          form = {form}
        >
          <Form.Item
            name="firstName"
            label="Customer Name"
            
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
           
          >
            <Input placeholder="Type your name" value={firstName} onChange={(e) => {setFirstName(e.target.value);clearAlert()}}/>
          </Form.Item>

            {/* <Form.Item 
              label="First Name"
            >
              <input className="textfield2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Item> */}
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            
          >
            <Input placeholder="Type your name" onChange={(e) => {setLastName(e.target.value);clearAlert()}}/>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter your title",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            clearFields
          >
            <Input placeholder="Type your name" onChange={(e) => setTitle(e.target.value)}/>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            
          >
            <Input placeholder="Type your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Temporary Password"
            rules={[
              {
                required: true,
                message: "Please temporary password",
              },
              { type: "text", message: "Please enter temporary password" },
            ]}
            
          >
            <Input placeholder="Type temporary password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
         
          <Form.Item name="cloudAccount" label="Cloud Account" requiredMark="optional">
            <Select 
             
              placeholder="Select your customer " 
               onChange={(e) => setCloudId(e) }>
                {customerCloudAccount.map((account, key) => { 
                    return  <Select.Option value={account.value} key={key} >{account.label}</Select.Option>
                
                })}
             </Select>
          </Form.Item>

          <Form.Item name="role" label="Roles" requiredMark="optional">
            <Select 
            
                placeholder="Select access  level"
                onChange={e => setRole(e)}
                
              >
               {accountRoles.map((role, key) => { 
                    return  <Select.Option value={role.id} key={key} >{role.label}</Select.Option>
                
                })}
          </Select>
            
          </Form.Item>
        

          {/* <Form.Item
            name="agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "I have verified that  this is a valid user."
                      ),
              },
            ]}
          >
            <Checkbox>
              {" "}
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 40 }}>
          <button onClick={createProfile} className='buttonPrimary'>Create Account</button>

          
          </Form.Item>
        </Form>
        </>
  
  );
}

export default CreateCustomerProfile;