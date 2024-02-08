import '../../App.css';
import {BellFilled, MailOutlined} from "@ant-design/icons";
import {Badge, Image, Space, Typography, Drawer, List, Select} from "antd"
import logo from '../../img/logo.png';

import {useEffect, useState } from "react";
//import {getComments, getOrders} from '../../API/index'
import Data from '../../Data/Data'
import { useContext } from 'react';
import { Context } from '../../Store';
import { setGlobalState, useGlobalState} from '../../state2';

const AppHeader = ({props}) => {
    
    const [profileState, setProfileState] = useContext(Context);
    const value = useContext(Context);
    // const stringObject = JSON.stringify(localStorage.getItem("profile"))
    // const profile = localStorage.getItem("profile")


    const[comments, setComments] = useState([]);
    const[orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen]= useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('')
    const [availableCloudAccounts, setAvailableCloudAccounts] = useState([]);
    const [availableCloudAccounts2, setAvailableCloudAccounts2] = useState([]);
    
    const currentAccountId = useGlobalState("accountId");
    const currentAccountName = useGlobalState("accountName");
    const defaultAccountId = useGlobalState("defaultAccountId");

    const [profile, setProfile] = useState([])

    let accountName = "";
    
    // useEffect(() =>{
    //     getPoliciesUsingAccountId();
    // })
    useEffect(() => {
        //setProfile(sessionStorage.getItem('profileData'))
        
        
        let profileData = sessionStorage.getItem('profileData')
        profileData = JSON.parse(profileData)
        setFullName(profileData.firstName + ' ' + profileData.lastName)
        console.log("Name =", profileData.firstName)
        
        let accountsData = sessionStorage.getItem('cloundAccountData')
        accountsData = JSON.parse(accountsData)

       
        setAvailableCloudAccounts(accountsData)


        console.log("accounts data =", accountsData)
       
       



        // console.log("My APPHEADER")
            //console.log("firstname =", value.firstName)
            //setLastName(state.lastName);
        // setFirstName(state.firstName)
    },[]);
    // useEffect(() => {
    //   getComments().then(res=>{
    //     setComments(res.comments)
    //   });
    //   //getOrders().then(res=>{
    //     setOrders(res.products)

    //     console.log("state data=", JSON.stringify(state))

    // });

    //   let profile2 = JSON.parse(localStorage.getItem("profile1"));

    // },[])
    
    const doStuf = () => {
        console.log("OUR PROFILE", profile)
   }
   /*get policies using account Id */
const getPoliciesUsingAccountId = async (accountId) => {
   
    console.log("availableCloudAccounts==", availableCloudAccounts)
    //accountName = availableCloudAccounts.filter(data => data.id == accountId)
    
    let accountName = ""
    availableCloudAccounts.map((data, index) => {
        if (data.id == accountId){
            accountName = data.label;
        }
    })
    console.log("MAMAMIA ==", accountName)

    setGlobalState("accountId", accountId)
    setGlobalState("accountName", accountName)
    setGlobalState("defaultAccountId", 0) //set defaultAccount Id to 0 if the account dropdown is selected

    console.log("my account id = awele =", accountId)
}


    return (


        <div className='AppHeader'>
        {
            localStorage.getItem("profile", )
        }
        <Image 
            width={65}
            src ={logo}>
        </Image>
        <Typography.Title level={5}>Welcome, {fullName}</Typography.Title>
        
        <Space>
        Cloud Accounts:
        <Select 
        
            defaultValue={defaultAccountId}   
            placeholder="Select cloud account" 
            style={{width:'250px'}}
            onChange={getPoliciesUsingAccountId}>
                
                {availableCloudAccounts.map((account, key) => { 
                    return  <Select.Option value={account.id} key={key} >{account.label}</Select.Option>
                
                })}
        </Select>
        </Space>
        <Space>
            <Badge count={comments.length} dot>
                <MailOutlined sytle={{ fontSize: 24}}  
                onClick={()=>{
                    setCommentsOpen(true);
                }} />
            </Badge>
            <Badge Count={orders.length}>
                <BellFilled  sytle={{ fontSize: 24}}  
                onClick={()=>{
                    setNotificationOpen(true);
                }} />
            </Badge>
        </Space>
        <Drawer title="Comments" open={commentsOpen} 
            onClose={()=> {
            setCommentsOpen(false);
            }} maskClosable >
            
            <List  dataSource={comments} renderItem={(item)=>{
                    <List.Item>{item.body}</List.Item>
                }}>
            </List>
        </Drawer>
        <Drawer title="Notifications" open={notificationOpen} 
            onClose={()=> {
            setNotificationOpen(false);
            }} maskClosable >

            <List  dataSource={orders} renderItem={(item)=>{
                    <List.Item><Typography.Text>{item.title}</Typography.Text>has been ordered!</List.Item>
                }}>
            
            </List>
        </Drawer>
        </div>
    );
   
}

export default AppHeader;