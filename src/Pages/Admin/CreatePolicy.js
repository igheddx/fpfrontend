import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Spin, Typography, Alert, Flex, Cascader, InputNumber, Mentions, TreeSelect, InputNumbers} from "antd";
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../Store';
import useEncryptDecrypt from '../../apis/useEncryptDescrypt';
import axios from "axios";
import useBearStore from "../../state/state";
import useStore from "../../state/state";
import { runes } from 'runes2';
  

import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';


const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function CreatePolicy() {

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
  const [policyType, setPolicyType] = useState([])
  const [policyTypeId, setPolicyTypeId] = useState();

  const [xApiKeyWithUserName1, setXapiKeyWithUserName1] = useState('')
  /*declare state variables*/
  const [availableCloudAccounts, setAvailableCloudAccounts] = useState([]);
  const [xapikeyNoAccessToken, setXapiKeyNoAccessToken] = useState('')
  //const [accessToken, setAccessToken] =useState('')

  //let accountsData = []
  let accessToken = sessionStorage.getItem('accessTokenData')
  let xapiKeyWithUserName = sessionStorage.getItem('xapikey')

  useEffect(() => {

     /*get clound account list*/
     let accountsData = sessionStorage.getItem('cloundAccountData')
     accountsData = JSON.parse(accountsData)
     setAvailableCloudAccounts(accountsData)
     
     let xapikeyNoAccessToken = sessionStorage.getItem('xapikeyNoAccessToken')
     setXapiKeyNoAccessToken(xapikeyNoAccessToken)

     let xapiKeyWithUserName = sessionStorage.getItem('xapikey')
     setXapiKeyWithUserName1(xapiKeyWithUserName)

    getPolicyType();

},[]);

 

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
      id: 3,
      label:  "Approver"
    },
    {
      id: 4,
      label:  "User"
    },
    
  ];

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }



  /*get policyType */
  const getPolicyType = async () => {
    

    setLoading(true)
    //let response = await API.get('/api/Policy/types')
    let response = await API.get('/api/Policy/types',
    {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + accessToken,
        'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
      }
    },
    
    ).catch((err) => {
    // setError(response2.error);
    console.log("there is failure", JSON.stringify(err))
    // console.log("Here " + JSON.stringify(err.response.status))
    }).finally(() => {
    setLoading(false);
    });

    if (response.status == 200) {
        setPolicyType(response.data)
    }
    console.log("policy type ||||", JSON.stringify(response.data))
}





  const API = axios.create({
  });


  const createProfile  = async (e) => {
    e.preventDefault();

    console.log("API key ==", xapikeyNoAccessToken,)
    console.log("refresh token", accessToken)
    console.log("first name = " + firstName)
    console.log("last name = " + lastName)
    console.log("email = " + email)
    
    console.log("ROLE = " + role)
    console.log("cloudId = " + cloudId)

    setLoading(true)
    let response = await API.post('/api/profile/register', {
      firstName: firstName,
      lastName: lastName,
      //email: email,
      //title: title,
      username: email,
      password: password,
      email: email,
      accountId: cloudId,
      roleId: role,
      phone: "+1800-123-43537",
      businessUnitId: "Finance"
      /*role: role,
      profileUuid: uuidv4(),
      customerId: state.customerId,
      accessToken: "",
      refreshToken: "",
      tokenIssuesAt: "",
      tokenExpiredAt: "",
      cloudAccountId: cloudId,
      status: "pending"*/
    },
    {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': accessToken,
            'X-Api-Key': xapikeyNoAccessToken,
     
        }
    },
    
    ).catch((err) => {
        setRegisterProfile(err);
        console.log("failed status == " + JSON.stringify(err.response.data));
    }).finally(() => {
        setLoading(false)
    });
    
    
    //setRegisterProfile(response.data)  //loginAPIResponse, res.data, {customerid: value.customerid});
    //setLoginAPIResponse());
    setResCode(response.status)
    
    console.log("create profile status == " + response.status);
    console.log("data = " + JSON.stringify(response.data));

    cleanup(response.status); 


  }
  

  const createProfileOld  = async (e) => {
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
  
  /*create polic*/
  const createPolicy = async (policy) => {
   
    //   let profileData = {
    //     firstName: profile.firstName,
    //     lastName:  profile.lastName,
    //     username: profile.email,
    //     password: profile.password,
    //     email: profile.email,
    //     accountId: profile.cloudId,
    //     roleId: profile.role,
    //     phone: "+1800-123-43537",
    //     businessUnitId: "IT"
    //   }
    
    let policyName = policy.policyDisplayName.replace(/\s/g, "-"); //remove space
  
    let policyData = {
        displayName: policy.policyDisplayName,
        type: policy.policyType,
        accountId: policy.cloudId,
        name: policyName,
        tagName: "tagName",
        tagValue: policy.tagValue,
    }

    
    console.log("#@#Oru Data =", policyData)
    console.log("#@#policName =", policyName)
    console.log("#@#AccessToken =", accessToken)
    console.log("#@#xAPI-key =",  xapiKeyWithUserName)
    
      setLoading(true)
      let response = await API.post('/api/Policy/createtag', policyData,
      {
          headers: {
              'Accept': 'text/plain',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + accessToken,
              'X-Api-Key': xapiKeyWithUserName,
       
          }
      },
      
      ).catch((err) => {
          setError(err);
          console.log("failed status == " + JSON.stringify(err.response.data));
      }).finally(() => {
          setLoading(false)
      });
  
      if (response.status == 200) {
        
      } else {
        console.log("something went wrong")
      }
    
      

      setResCode(response.status)
      
      console.log("create profile status == " + response.status);
      console.log("data = " + JSON.stringify(response.data));
  
      cleanup(response.status); 

  }

   
  const submitForm = () => {
    form.resetFields();
  };


  const cleanup = (code) => {
    console.log("I was called = and the success code = ", code)
    if (code > 199 && code < 299) {
      console.log("I am between 201 and 299", code)

          submitForm()
        
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
     
       
    <div 
      style={{

        width: '500px',
        backgroundColor:  '#F0F0F0',
        padding: '14px 20px',

    }}
      
    >

    <Typography.Title level={5}>Create Policy </Typography.Title>
        {isUpdateSuccess ==true ? 
                <><Alert message="Policy was successfully created." type="success" /> <br></br></>: "" }

        {loading && 
          <Spin tip="Processing, please wait" size="small">
            <div className="content" />
          </Spin>      
        }

    </div>
    <Flex vertical gap={16}>

   
    <div   
      style={{
            height: '500px',
            width: '500px',
            backgroundColor:  '#F0F0F0',
            padding: '14px 20px'
           
        }}
      >
    
    <Form
        labelCol={{span: 8}}
        wrapperCol={{span: 14}}
        form={form}
        autoComplete="off"
        onFinish={(values) => {createPolicy(values);
        }}
        onFinishFailed={(error) => {
        console.log({ error });
      }}
    >
    
    <Form.Item
      label="Policy Name:"
      name="policyDisplayName"
      
      rules={[
        {
          required: true,
          message: 'Please enter policy name!',
        },
        { whitespace: true },
        { min: 3 },
      ]}
      hasFeedback
    >
      <Input placeholder= "Policy Name" />
    </Form.Item>
    
    

    <Form.Item 
        name="policyType" 
        label="Policy Type" 
        requiredMark="optional">
            <Select 
            
                placeholder="Select policy type"
                onChange={e => setPolicyTypeId(e)}
                
              >
               {policyType.map((type, key) => { 
                    return  <Select.Option value={type.policyTypeId} key={key} >{type.name}</Select.Option>
                
                })}
          </Select>
            
    </Form.Item>

    {/* <Form.Item
      label="Tag Name:"
      name="tagName"
      
      rules={[
        {
          required: true,
          message: 'Please enter tag name!',
        },
        { whitespace: true },
        { min: 3 },
      ]}
      hasFeedback
    >
      <Input placeholder= "Tag Name" prefix={<UserOutlined className="site-form-item-icon" />}/>
    </Form.Item> */}

    <Form.Item
      label="Tag Value:"
      name="tagValue"
      
      rules={[
        {
          required: true,
          message: 'Please enter tag value!',
        },
        { whitespace: true },
        { min: 3 },
      ]}
      hasFeedback
    >
      <Input placeholder= "Tag Value" />
    </Form.Item>



    <Form.Item 
      name="cloudId"  
      label = "Cloud Account:"
      rules={[
        {
          required: true,
          message: 'Please select Cloud Account',
        },
      ]}
     >
        <Select 
          
          placeholder="Select cloud account" 
            onChange={(e) => setCloudId(e) }>
            {availableCloudAccounts.map((account, key) => { 
                return  <Select.Option value={account.id} key={key} >{account.label}</Select.Option>
            
            })}
          </Select>
    </Form.Item>
    
   
   
    <Form.Item
    
      wrapperCol={{ span: 30 }}
      labelCol={{span: 100}}
    >
      <Button 
        block 
        type="primary" 
        className='buttonPrimary' 
         htmlType="submit"
         
         style={
          {
            backgroundColor: "#B7E5B4",
            color: "#343A40",
            fontWeight: "bold",
            whiteSpace: "normal",
            height:'auto',
            marginBottom:'10px',
            color: 'white'
          }
        }
      >
        Create Policy
      </Button>
    </Form.Item>
  </Form>
  </div>
  </Flex>
  </>
  
  );
}

export default CreatePolicy;