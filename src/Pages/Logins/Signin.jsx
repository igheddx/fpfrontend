import React, { useContext } from 'react'
import { Alert, Space,  Spin } from 'antd';
import './index.css';
import Error from '../../Components/Alert/Error';
import Info from '../../Components/Alert/Info';
import Warning from '../../Components/Alert/Warning';
import Success from '../../Components/Alert/Success';
import { useState, useEffect } from 'react'
import useBearStore from "../../state/state";
import useStore from "../../state/state";

import useEncryptDecrypt from '../../apis/useEncryptDescrypt';

import axios from "axios";
import { Navigate, json } from "react-router-dom";
import AppHeader from "../../Components/AppHeader"
import SideMenu from "../../Components/SideMenu";
import PageContent from "../../Components/PageContent";
import AppFooter from "../../Components/AppFooter";
import { Context } from '../../Store';
import { setGlobalState, useGlobalState} from '../../state2';
//import '../../App.css';

window.name = "";

function Signin() {

    const setIsUserValid = useBearStore((state) => state.setIsUserValid);
    const getFullName = useStore(state => state.fullName);
    const [profileState, setProfileState] = useContext(Context);

    const {data: encryptDecryptDataWithUserName, getEncryptDecryptWithUserName} = useEncryptDecrypt()
    const {data: encryptDecryptDataNoUserName, getEncryptDecryptNoUserName} = useEncryptDecrypt()
    

    const [apiResponse, setApiResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [responseCode, setResponseCode] = useState(0);
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [goAuthenticate, setGoAuthenticate] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [profileStatus, setProfileStatus] = useState('');
    const [profile, setProfile] = useState({})
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [isReauthenticate, setIsReauthenticate] = useState(false);

    const defaultAccountId = useGlobalState("defaultAccountId");

    useEffect(() => {

    

        getEncryptDecryptNoUserName()
        //setState()
        //setState();
        //setHeader1(encryptDecryptData)
    }, []);


    let token = sessionStorage.getItem('accessTokenData')
    const API = axios.create(
        
        {
        
        baseURL: "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws",
        //baseURL: "http://localhost:3000",
        
   
        headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',//'application/json',
        'Access-Control-Allow-Origin': 'http://3.142.46.43/',//'http://localhost:3000',
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Authorization': "Bearer " + token,
        'X-Api-Key': encryptDecryptDataWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
 
        }
    });

    //encryption without user name
    const API2 = axios.create({
        baseURL: "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws",
        //baseURl: "http://localhost:3000",
        headers: {

            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://3.142.46.43/',//'http://localhost:3000',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Authorization': '',
            'X-Api-Key': encryptDecryptDataNoUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
    
        }
    });


   

  

    const processLogin = (data, resCode, propsProfileStatus) => {

            if (data.length > 0) {
                data.map((d1) =>{
                    if (d1.status == "pending"){
                        console.log("it's pending", d1.firstName)
                        setApiResponse(data);
                        setChangePassword(true);
                        setPassword('');
                        setNewPassword('');
                        setProfileStatus('pending');
                        setIncorrectLogin(false)
                    } else {
                        console.log("I called authenticate")
                        //authenticate(response.data)
                        console.log("Data before auth =", JSON.stringify(data))
                        
                        let profile1 = null
                        data.map((data) =>{
                            console.log("my customerId =", data.customerId)
                            console.log("my firstName =", data.firstName)
                            console.log("my lastName =", data.lastName)
                            
                            
                            profile1 ={
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                title: data.title,
                                username: data.username,
                                password: password, //new password,
                                role: data.role,
                                profileUuid: data.profileUuid,
                                customerId: data.customerId,
                                accessToken: data.accessToken,
                                refreshToken: data.refreshToken,
                                tokenIssuesAt: data.tokenIssuesAt,
                                tokenExpiredAt:  data.tokenExpiredAt,
                                cloudAccountId:  data.cloudAccountId,
                                status: data.status //new status,
                            }
                            //etProfile({
                                
                            // })
                        })
                        
                        console.log("profile = ", JSON.stringify(profile1))
                        setIncorrectLogin(false)
                        profileState(null); //clear profile state
                        //setState(profile1);
                        setChangePassword(false);
                        setIsUserValid(true);
                        //test();
                    }
               })
            } else  {
                setIncorrectLogin(true)
                console.log("incorrect login")
            }
            
       //}
       
        //console.log("JJJJ==" + JSON.stringify(data))
        // const user = data.find((user) => user.email === username && user.password === password);
        
        // const user2 = data.filter(user => user.username == username && user.password === password)

        console.log("user2 =" + JSON.stringify(data))


        // console.log("first name =" +  user2.firstName)
       
        
        
     
       // console.log("user ==" + JSON.stringifme + " passwore =" + password)

        // const profile2 = {y(user))
        // console.log("username =" + userna
        //     firstName: "",
        //     lastName: ""
        // }
      
    }

  

    /*original authentication call 11/24/23*/
    const authenticate = async  (e)  => {

        e.preventDefault()

        /*clear any previous login error */
        setIncorrectLogin(false)

        console.log("encrypt no user name", encryptDecryptDataNoUserName)
        setLoading(true)
        console.log("I called the api")
        let url = "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws"

        /*let response = await axios({
            
            
            method: 'post',
            url: `http://localhost:3000/api/profile/authenticate`,
            withCredentials: false,
            data: {
                username: username,
                password: password
            },
           
            // params: {
            //   access_token: '',
            // },
          }).catch((err2) => {
            setError(err2);
        }).finally(() => {
            setLoading(false)
            
        });*/

        /*
        const axios = require('axios');

        const options = {
        method: 'GET',
        url: 'https://famous-quotes4.p.rapidapi.com/random',
        params: {
            category: 'all',
            count: '2'
        },
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        */
        let response =  await API2.post("/api/profile/authenticate",
            {
                username: username,
                password: password,
            },
            // {
            //     headers: {
            //         'Accept': 'text/plain',
            //         'Content-Type': 'application/json',
            //         //'Access-Control-Allow-Origin': 'http://localhost:3000',
            //         //'Access-Control-Allow-Headers': 'X-Requested-With',
            //         'Authorization': '',
            //         'X-Api-Key': encryptDecryptDataNoUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
             
            //     }
            // },
        ).catch((err2) => {
            setError(err2);
        }).finally(() => {
            setLoading(false)
            
        }); 

        setLoading(false)
        console.log("username =", username)
        getEncryptDecryptWithUserName(username) //get new x-api-key with username
       
        console.log("MY PROFILE DATA ==", JSON.stringify(response.data))
        
       let isSuccessful =  response.data.success
       let statusCode = response.status;
       let isVerified = response.data.isVerified
       let data = response.data
       let profileData = null
       let roleData = null
       let cloudAccountData = []


       sessionStorage.setItem("accessTokenData", data.token);
       sessionStorage.setItem('profileId', data.profileid)

       console.log("AWELE IGHEDOSA PROFILEID ==", data.profileid)
       console.log("AWELE IGHEDOSA PROFILEID ==", JSON.stringify(response.data))
       
        if (isSuccessful && statusCode == 200) {
            let isCustomerAdmin = false
            let role = ""
            /*check to see if the role has "customer" which is equla to customer admin
            if role is customer, then we present admin view... if the myrole is nul then
            access dedault role array...*/
            data.role.reduce((result, current, i) => {
                if (current.role == "Customer") {
                    //result.push(<div>DOMINIC {current}</div>);

                    isCustomerAdmin = true
                    role = "Customer"
                    console.log("I am a customer")
                } else  {
                    role = current.role
                    console.log("role string =", current.role)
                }
                return result;
                }, [])

                profileData = {
                rofileUuid: data.profileUuid,
                customerId: data.customerId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: role,
                isCustomerAdmin: isCustomerAdmin,
                accessToken: data.token,
                refreshToken: data.refreshToken,
                tokenIssuesAt: data.tokenIssuesAt,
                tokenExpiredAt: data.tokenExpiredAt
            } 
            
          
            
             /*do this if defaultAccountId is not 5 - use the 1 account as the default
              */
            if (data.accounts.length == 1) {
                data.accounts.map((acct, key) => {
                    let isMyDefaultAccount = false
                  
                    isMyDefaultAccount  = true
                    setGlobalState("defaultAccountId", acct.accountId); //this is where I am setting the defaultAccountId

                    cloudAccountData.push (
                        {
                            id: acct.accountId,
                            label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                            success: acct.success,
                            isDefaultAccount: isMyDefaultAccount,
                        }
                    )
                })
            } else {
                data.accounts.map((acct, key) => {
                    let isMyDefaultAccount = false
                    if (acct.accountId == 5) {
                        isMyDefaultAccount  = true
                        setGlobalState("defaultAccountId", acct.accountId); //this is where I am setting the defaultAccountId
                    
                    }
                    
                    cloudAccountData.push (
                        {
                            id: acct.accountId,
                            label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                            success: acct.success,
                            isDefaultAccount: isMyDefaultAccount,
                        }
                    )
                })
            }
            
           

            
            console.log("MY IGHEDOSA ROLE  HERE=", role)
            /*store reusable data in session */
            sessionStorage.setItem("profileData", JSON.stringify(profileData));
            sessionStorage.setItem("roleData", role);
            sessionStorage.setItem("cloundAccountData", JSON.stringify(cloudAccountData));
            
            console.log("CABALL PROFILE", JSON.stringify(profileData))
            setIsUserValid(true); //temp comment out 11/24

            return <Navigate replace to="/" />;     
        } else  {
            setIncorrectLogin(true)
        }
        

    }

    /*call reauth authentication call 12/20/23*/
    const reAuthenticate = async  ()  => {

        /*clear any previous login error */
        setIncorrectLogin(false)


        console.log("encrypt no user name", encryptDecryptDataNoUserName)
        setLoading(true)
        console.log("I called the api")
        let response =  await API2.post("/api/profile/authenticate",
            {
                username: username,
                password: password,
            },
            // {
            //     headers: {
            //         'Accept': 'text/plain',
            //         'Content-Type': 'application/json',
            //         'Authorization': '',
            //         'X-Api-Key': encryptDecryptDataNoUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
             
            //     }
            // },
        ).catch((err2) => {
            setError(err2);
        }).finally(() => {
            setLoading(false)
            
        });

        setLoading(false)
        console.log("username =", username)
        getEncryptDecryptWithUserName(username) //get new x-api-key with username
       
        
       let isSuccessful =  response.data.success
       let isVerified = response.data.isVerified
       let data = response.data
       let profileData = null
       let roleData = null
       let cloudAccountData = []


       sessionStorage.setItem("accessTokenData", data.token);
       sessionStorage.setItem('profileId', data.profileid)

       console.log("AWELE IGHEDOSA PROFILEID ==", data.profileid)
       console.log("AWELE IGHEDOSA PROFILEID ==", JSON.stringify(response.data))

        /*checj to see if user has confirmed password*/
        if (isVerified == false) {
                setApiResponse(data);
                setChangePassword(true);
                setPassword('');
                setNewPassword('');
                setProfileStatus('pending');
                setIncorrectLogin(false)

            } else {
                let isCustomerAdmin = false
                /*check to see if the role has "customer" which is equla to customer admin
                if role is customer, then we present admin view... if the myrole is nul then
                access dedault role array...*/
                data.role.reduce((result, current, i) => {
                    if (current.role == "Customer") {
                      //result.push(<div>DOMINIC {current}</div>);
    
                      isCustomerAdmin = true
                    } 
                    return result;
                  }, [])
    
                  profileData = {
                    rofileUuid: data.profileUuid,
                    customerId: data.customerId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    isCustomerAdmin: isCustomerAdmin,
                    accessToken: data.token,
                    refreshToken: data.refreshToken,
                    tokenIssuesAt: data.tokenIssuesAt,
                    tokenExpiredAt: data.tokenExpiredAt
                } 
                
                data.accounts.map((acct, key) => {
                    let isMyDefaultAccount = false
                    if (acct.accountId == 5) {
                        isMyDefaultAccount  = true
                        setGlobalState("defaultAccountId", 5) //this is where I am setting the defaultAccountId
                        /*i'll need to get this from the accountData object in the future */
                    }
                    
                    cloudAccountData.push (
                        {
                            id: acct.accountId,
                            label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                            success: acct.success,
                            isDefaultAccount: isMyDefaultAccount,
                        }
                    )
                })
               
                /*store reusable data in session */
                sessionStorage.setItem("profileData", JSON.stringify(profileData));
                sessionStorage.setItem("roleData", JSON.stringify(data));
                sessionStorage.setItem("cloundAccountData", JSON.stringify(cloudAccountData));
              
                
                
                setIsUserValid(true); //temp comment out 11/24
    
               return <Navigate replace to="/" />;
            
            }
    }

    const updatePassword = async  (e)  => {

        e.preventDefault();

    
        let profileId = sessionStorage.getItem('profileId')
        console.log("MY PROFILEE== ", profileId)
        let token = sessionStorage.getItem('accessTokenData')
        console.log("encrypt=", encryptDecryptDataWithUserName)
        console.log("encrypt without username",encryptDecryptDataNoUserName)
        console.log("token", token)
        setLoading(true)
        console.log("I called the api")
        let response =  await axios.post("/api/profile/updateverify",
            {
                profileId: profileId,
                isVerified: true,
            },
            {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                    'X-Api-Key': encryptDecryptDataWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
             
                }
            },
        ).catch((err2) => {
            setError(err2);
            console.log("error", err2)
        }).finally(() => {
            setLoading(false)
            
        });


        if (response.data.success == true) {
             
             console.log("update password was successful")
             reAuthenticate()
        } else {
             console.log("I was not verified")
        }
}
    
  return (
    <>
    <div 
        style={{
            height: '500px',
            width: '500px',
            backgroundColor:  '#F0F0F0',
            padding: '14px 20px',
            margin: 'auto'
        }}>
        
        <div className='create'>
             <h2>Login</h2>
        </div>
        
        <div>
  
            {isReauthenticate ? <Warning data = {1} /> : null} 
            {incorrectLogin ? <Warning data = {2} /> : null}
            {changePassword ? <Warning data = {3} /> : null}
            {!loading && error && <Warning data = {4} /> }
            {/* {loading && 
            <Spin tip="Processing, please wait" size="small">
            <div className="content" />
            </Spin>      
            } */}
            <Spin spinning={loading} fullscreen />
        </div>
        <Space size={10} />
        <div className='create'>

            
        <form >
           
            <label for="email">Email:</label>
            <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className='textfield'
                placeholder='Enter email...'
            />
            {changePassword? <label>New Password:</label> :  <label>Password:</label> }
            <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='textfield'
                placeholder='Enter password...'
            />
             {changePassword ? 
             <>
             <label>Confirm New Password:</label>
             <input 
                type="password" 
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='textfield'
            /></> : ""}
            <br></br>
           
            {changePassword? <button onClick={updatePassword} className='buttonPrimary'>Continue</button> : 
            <button onClick={ authenticate} className='buttonPrimary'> Log In</button> } 
            
        </form>



    </div>
    </div>
   
    </>
  )
}

export default Signin;