import '../../App.css';
import {BellFilled, MailOutlined} from "@ant-design/icons";
import {Badge, Image, Space, Typography, Drawer, List} from "antd"
import logo from '../../img/logo.png';

import {useEffect, useState } from "react";
//import {getComments, getOrders} from '../../API/index'
import Data from '../../Data/Data'
import { useContext } from 'react';
import { Context } from '../../Store';

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
    
    

    const [profile, setProfile] = useState([])
    useEffect(() => {
        //setProfile(sessionStorage.getItem('profileData'))
        
        
        let profileData = sessionStorage.getItem('profileData')
        profileData = JSON.parse(profileData)
        setFullName(profileData.firstName + ' ' + profileData.lastName)
        console.log("Name =", profileData.firstName)
        
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