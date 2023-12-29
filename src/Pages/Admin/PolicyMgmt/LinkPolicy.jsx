
import { PlayCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, Typography, Alert } from "antd";
import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from "axios";
import Highlighter from 'react-highlight-words';
import {
    StopOutlined,
    PlayCircleFilled

  } from "@ant-design/icons";

function LinkPolicy()  {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [policyName, setPolicyName] = useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [availableCloudAccounts, setAvailableCloudAccounts] = useState([]);
  const [xapikeyNoAccessToken, setXapiKeyNoAccessToken] = useState('')
  const [xApiKeyWithUserName1, setXapiKeyWithUserName1] = useState('')
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();
  const [policyType, setPolicyType] = useState([])
  const [cloudId, setCloudId] = useState();
  const [policyTypeId, setPolicyTypeId] = useState();
  const API = axios.create({
  });


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

  const clearAlert = () => {
    setIsUpdateSuccess(false)
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
    console.log("policy type", JSON.stringify(response.data))
}
  /*add new policy*/
  const addPolicy  = async (e) => {
    e.preventDefault();

    setLoading(true)
    let response = await API.post('/api/Policy/add', {
      name: policyName,
      type: policyTypeId,
    },
    {
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': accessToken,
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
    
  }

  
  return (
    <>
     <Typography.Title level={5}>Link Policy  </Typography.Title>
        {isUpdateSuccess ==true ? 
                <><Alert message="Your request was successfully submitted." type="success" /> <br></br></>: "" }

        <div></div>
        <div
          style={{
            height: '500px',
            width: '500px',
            backgroundColor:  '#F0F0F0',
            padding: '14px 20px',
            margin: 'auto'
        }}
      
        >
        <Form
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 13 }}
          //onFinish={onFinish}
          form = {form}
        >
          <Form.Item
            name="policyName"
            label="Policy Name"
            
            rules={[
              {
                required: true,
                message: "Please enter policy name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
           
          >
            <Input placeholder="Type your name" value={policyName} onChange={(e) => {setPolicyName(e.target.value);clearAlert()}}/>
          </Form.Item>

          <Form.Item name="policyType" label="Policy Type" requiredMark="optional">
            <Select 
            
                placeholder="Select policy type"
                onChange={e => setPolicyTypeId(e)}
                
              >
               {policyType.map((type, key) => { 
                    return  <Select.Option value={type.policyTypeId} key={key} >{type.name}</Select.Option>
                
                })}
          </Select>
            
          </Form.Item>

          <Form.Item name="cloudAccount" label="Cloud Account" requiredMark="optional">
            <Select 
             
              placeholder="Select cloud account" 
               onChange={(e) => setCloudId(e) }>
                {availableCloudAccounts.map((account, key) => { 
                    return  <Select.Option value={account.id} key={key} >{account.label}</Select.Option>
                
                })}
             </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 40 }}>
          <button onClick={addPolicy} className='buttonPrimary'>Add Policy</button>

          
          </Form.Item>
        </Form>
        </div>
       
        

        {/*<Typography.Title level={4}>Update Policy</Typography.Title>
    
  <Table columns={columns} dataSource={data} /> */}

    </>
  );
};
export default LinkPolicy;