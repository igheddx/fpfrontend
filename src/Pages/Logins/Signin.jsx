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

import useEncryptDecrypt from '../../API/useEncryptDescrypt';

import axios from "axios";
import { Navigate, json } from "react-router-dom";
import AppHeader from "../../Components/AppHeader"
import SideMenu from "../../Components/SideMenu";
import PageContent from "../../Components/PageContent";
import AppFooter from "../../Components/AppFooter";
import { Context } from '../../Store';
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
    useEffect(() => {

    

        getEncryptDecryptNoUserName()
        //setState()
        //setState();
        //setHeader1(encryptDecryptData)
    }, []);

    const API = axios.create({
       //baseURL: "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws",
       headers: { 
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': '',
        'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',

        // 'Accept': 'text/plain',
        // 'Content-Type': 'application/json',
        // 'Authorization': '',
        // 'X-Api-Key': encryptDecryptData,
     }
    });

    const profile0 = {
            
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        username: "",
        password: "",
        role: "",
        profileUuid: "",
        customerId:  "",
        accessToken:  "",
        refreshToken: "",
        tokenIssuesAt:  "",
        tokenExpiredAt: "",
        cloudAccountId: "",
        status: "",
        id: 0
    }

   

    const updatePasswordOld = async (e) => {
        
        e.preventDefault();
        setLoading(true)
        let response = [];
        let response2 = [];
        let id = 0

        apiResponse.map((d1) =>{
            id = d1.id
            user3 =
                {
                    firstName: d1.firstName,
                    lastName: d1.lastName,
                    email: d1.email,
                    title: d1.title,
                    username: d1.username,
                    password: password, //new password,
                    role: d1.role,
                    profileUuid: d1.profileUuid,
                    customerId: d1.customerId,
                    accessToken: d1.accessToken,
                    refreshToken: d1.refreshToken,
                    tokenIssuesAt: d1.tokenIssuesAt,
                    tokenExpiredAt:  d1.tokenExpiredAt,
                    cloudAccountId:  d1.cloudAccountId,
                    status: "active" //new status,
                }
        })
          
            
            
       // })

        console.log("user3 inside inside == "+ JSON.stringify(user3))
        // console.log("Pending status = " + profileStatus + "   "+ state.profileUuid)
        let params = null;
        params = new URLSearchParams('?id='+ id);
        response = await API.put("http://localhost:3000/profile/"+id, user3).catch((err) => {
            //setError(err.response.status);
            console.log("Here ERROR " + JSON.stringify(err))
        }).finally(() => {
            setLoading(false);
        });

        if (response.status >199 && response.status <300){
            console.log("uppdate password", response.status)
            setChangePassword(false);
            setIsReauthenticate(true);
            setPassword('')
        } else  {
            console.log(" DID NOT WORK uppdate password", response.status)
        }
    }


    const authenticate_old = async ()  => {
        setLoading(true)
        let response = []
        setProfileStatus('active')
        let params = new URLSearchParams('?username='+ username + '&password='+password);
            response = await API.get("http://localhost:3000/profile", {params}).catch((err) => {
            // setError(response2.error);
            console.log("there is failure", JSON.stringify(err))
            // console.log("Here " + JSON.stringify(err.response.status))
            }).finally(() => {
            setLoading(false);
            });
        
        console.log("response.data authenticate = ", JSON.stringify(response.data))
        processLogin(response.data, response.status.data, "");
    }


    const processLogin = (data, resCode, propsProfileStatus) => {

       
        // if (profileStatus == "pending2") {
        //     console.log("do i have data", data.length)
        //     if (data.status == "active") {
        //         setProfileStatus('active')
        //         console.log("I am goodto proceed")
                
        //     }
        // } else {
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
       
        
        
     
       // console.log("user ==" + JSON.stringify(user))
        console.log("username =" + username + " passwore =" + password)

        const profile2 = {
            firstName: "",
            lastName: ""
        }
      
        //user2.map((data)=> {
            // console.log(" INSIDE MAP user2 status =" + data.status)
            // profile.firstName = data.firstName
            // profile.lastName = data.lastName
            // profile.email = data.email
            // profile.username = data.username
            // profile.password = data.password
            // profile.role = data.role
            // profile.profileUuid = data.profileUuid
            // profile.customerId = data.customerId
            // profile.accessToken = data.accessToken
            // profile.refreshToken = data.refreshToken
            // profile.tokenIssuesAt = data.tokenIssuesAt
            // profile.tokenExpiredAt = data.tokenExpiredAt
            // profile.cloudAccountId = data.cloudAccountId
            // profile.status = data.status
            // profile.id = data.id

        //     user3 = {
        //         firstName: data.firstName,
        //         lastName: data.lastName,
        //         email: data.email,
        //         username: data.username,
        //         password: data.password, //new password,
        //         role: data.role,
        //         profileUuid: data.profileUuid,
        //         customerId: data.customerId,
        //         accessToken: data.accessToken,
        //         refreshToken: data.refreshToken,
        //         tokenIssuesAt: data.tokenIssuesAt,
        //         tokenExpiredAt:  data.tokenExpiredAt,
        //         cloudAccountId:  data.cloudAccountId,
        //         status: data.status //new status,
        //     //})

        //     }
                
        //     // setProfile({
        //     //     firstName: data.firstName,
        //     //     lastName: data.lastName,
        //     //     email: data.email,
        //     //     username: data.username,
        //     //     password: password, //new password,
        //     //     role: data.role,
        //     //     profileUuid: data.profileUuid,
        //     //     customerId: data.customerId,
        //     //     accessToken: data.accessToken,
        //     //     refreshToken: data.refreshToken,
        //     //     tokenIssuesAt: data.tokenIssuesAt,
        //     //     tokenExpiredAt:  data.tokenExpiredAt,
        //     //     cloudAccountId:  data.cloudAccountId,
        //     //     status: data.status //new status,
        //     // })
        // })

       // setState(data)
        // console.log("user2.status == MEEEE " + data.status)
        // if (data.status == 'active') {
        //     setChangePassword(false);
        //     setIsUserValid(true);
        // } else {
            //user2.map((data)=> {
                // console.log(" INSIDE MAP user2 status =" + data.status)
                // profile.firstName = data.firstName
                // profile.lastName = data.lastName
                // profile.email = data.email
                // profile.username = data.username
                // profile.password = data.password
                // profile.role = data.role
                // profile.profileUuid = data.profileUuid
                // profile.customerId = data.customerId
                // profile.accessToken = data.accessToken
                // profile.refreshToken = data.refreshToken
                // profile.tokenIssuesAt = data.tokenIssuesAt
                // profile.tokenExpiredAt = data.tokenExpiredAt
                // profile.cloudAccountId = data.cloudAccountId
                // profile.status = data.status
                // profile.id = data.id

                // setProfile({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     email: data.email,
                //     username: data.username,
                //     password: password, //new password,
                //     role: data.role,
                //     profileUuid: data.profileUuid,
                //     customerId: data.customerId,
                //     accessToken: data.accessToken,
                //     refreshToken: data.refreshToken,
                //     tokenIssuesAt: data.tokenIssuesAt,
                //     tokenExpiredAt:  data.tokenExpiredAt,
                //     cloudAccountId:  data.cloudAccountId,
                //     status: data.status //new status,
                // })

                // setChangePassword(true);
                // setPassword('');
                // setNewPassword('');
                // setProfileStatus(data.status);

            //})

            
    
    //    }
        // console.log("user2.status == " + user2.status)
        
    
        // console.log("state.profile = " +JSON.stringify(profile))



        // if (user) {
        //    // login success
        //    console.log("SUCCESS")
        
        // }
        // else {
        //      // login failed
        //      console.log("FAILED")
        // }
    }

  

    let user3 = [];


    /*this is the authentication calll when I am using mock api db.json
    const authenticate_old_112423 = async (e) => {
    */
    const authenticateMock= async (e) => {

        e.preventDefault();
        setLoading(true)
        
        let response = [];
        let response2 = [];
        let id = 0
        console.log("get ready to call username=" + username + " password =" + password)
        
          // useEffect(() => {
        //     if (goAuthenticate == true) {
        //         console.log("I calle because go = " + goAuthenticate)

        //         makePostAPICall();
        //     }
        
        // }, [goAuthenticate])

        // useEffect(() => {
        
        //     console.log(JSON.stringify(apiResponse), 'this items change')
            
        //     //setApiResponse(apiResponse)
        // }, [apiResponse])
        
        // if (profileStatus == "pending") {
        //     console.log("I am inside pending")
        //     //const user3 = profile.map((data)=> {
        //     apiResponse.map((d1) =>{
        //         id = d1.id
        //         user3 =
        //             {
        //                 firstName: d1.firstName,
        //                 lastName: d1.lastName,
        //                 email: d1.email,
        //                 title: d1.title,
        //                 username: d1.username,
        //                 password: password, //new password,
        //                 role: d1.role,
        //                 profileUuid: d1.profileUuid,
        //                 customerId: d1.customerId,
        //                 accessToken: d1.accessToken,
        //                 refreshToken: d1.refreshToken,
        //                 tokenIssuesAt: d1.tokenIssuesAt,
        //                 tokenExpiredAt:  d1.tokenExpiredAt,
        //                 cloudAccountId:  d1.cloudAccountId,
        //                 status: "active" //new status,
        //             }
        //     })
              
                
                
        //    // })

        //     console.log("user3 inside inside == "+ JSON.stringify(user3))
        //     // console.log("Pending status = " + profileStatus + "   "+ state.profileUuid)
        //     let params = null;
        //     params = new URLSearchParams('?id='+ id);
        //     response = await API.put("http://localhost:3000/profile/"+id, user3).catch((err) => {
        //         //setError(err.response.status);
        //         console.log("Here ERROR " + JSON.stringify(err))
        //     }).finally(() => {
        //         setLoading(false);
        //     });
        // } else {
            let params = new URLSearchParams('?username='+ username + '&password='+password);
            response = await API.get("http://localhost:3000/profile", {params}).catch((err) => {
            // setError(response2.error);
            console.log("there is failure", JSON.stringify(err))
            // console.log("Here " + JSON.stringify(err.response.status))
            }).finally(() => {
            setLoading(false);
            });
       // }


        
        
        console.log("response.data =", JSON.stringify(response.data))
        processLogin(response.data, response.status.data, profileStatus )
        
        setResponseCode(response.status.data);
    }
  

    /*original authentication call 11/24/23*/
    const authenticate = async  (e)  => {

        e.preventDefault()

        /*clear any previous login error */
        setIncorrectLogin(false)


        console.log("encrypt no user name", encryptDecryptDataNoUserName)
        setLoading(true)
        console.log("I called the api")
        let response =  await axios.post("/api/profile/authenticate",
            {
                username: username,
                password: password,
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': '',
                    'X-Api-Key': encryptDecryptDataNoUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
             
                }
            },
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
       let isVerified = response.data.isVerified
       let data = response.data
       let profileData = null
       let roleData = null
       let cloudAccountData = []


       sessionStorage.setItem("accessTokenData", data.token);
       sessionStorage.setItem('profileId', data.profileid)

       console.log("AWELE IGHEDOSA PROFILEID ==", data.profileid)
       console.log("AWELE IGHEDOSA PROFILEID ==", JSON.stringify(response.data))
       
       /*if (isSuccessful == true) {
            let isCustomerAdmin = false
            /*check to see if the role has "customer" which is equla to customer admin
            if role is customer, then we present admin view... if the myrole is nul then
            access dedault role array...
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
                cloudAccountData.push (
                    {
                        id: acct.accountId,
                        label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                        success: acct.success
                    }
                )
            })
        
            /*store reusable data in session 
            sessionStorage.setItem("profileData", JSON.stringify(profileData));
            sessionStorage.setItem("roleData", JSON.stringify(data));
            sessionStorage.setItem("cloundAccountData", JSON.stringify(cloudAccountData));
        
            
            
            setIsUserValid(true); //temp comment out 11/24

        return <Navigate replace to="/" />;
    }*/
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
                let role = ""
                /*check to see if the role has "customer" which is equla to customer admin
                if role is customer, then we present admin view... if the myrole is nul then
                access dedault role array...*/
                data.role.reduce((result, current, i) => {
                    if (current.role == "Customer") {
                      //result.push(<div>DOMINIC {current}</div>);
    
                      isCustomerAdmin = true
                      role = "Customer"
                    } else  {
                        role = "User"
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
                
                data.accounts.map((acct, key) => {
                    cloudAccountData.push (
                        {
                            id: acct.accountId,
                            label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                            success: acct.success
                        }
                    )
                })
               
                console.log("MY IGHEDOSA ROLE =", role)
                /*store reusable data in session */
                sessionStorage.setItem("profileData", JSON.stringify(profileData));
                sessionStorage.setItem("roleData", role);
                sessionStorage.setItem("cloundAccountData", JSON.stringify(cloudAccountData));
              
                
                
                setIsUserValid(true); //temp comment out 11/24
    
               return <Navigate replace to="/" />;
            
            }
                

    }

    /*call reauth authentication call 12/20/23*/
    const reAuthenticate = async  ()  => {

        /*clear any previous login error */
        setIncorrectLogin(false)


        console.log("encrypt no user name", encryptDecryptDataNoUserName)
        setLoading(true)
        console.log("I called the api")
        let response =  await axios.post("/api/profile/authenticate",
            {
                username: username,
                password: password,
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': '',
                    'X-Api-Key': encryptDecryptDataNoUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
             
                }
            },
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
                    cloudAccountData.push (
                        {
                            id: acct.accountId,
                            label: acct.cloudProviderName + ' - ' + acct.cloudAccountId,
                            success: acct.success
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
        console.log("MY PROFILE == ", profileId)
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
    const updatePasswordOld2 = async (e) => {
        
        e.preventDefault();
        setLoading(true)
        let response = [];
        let response2 = [];
        let id = 0

        apiResponse.map((d1) =>{
            id = d1.id
            user3 =
                {
                    firstName: d1.firstName,
                    lastName: d1.lastName,
                    email: d1.email,
                    title: d1.title,
                    username: d1.username,
                    password: password, //new password,
                    role: d1.role,
                    profileUuid: d1.profileUuid,
                    customerId: d1.customerId,
                    accessToken: d1.accessToken,
                    refreshToken: d1.refreshToken,
                    tokenIssuesAt: d1.tokenIssuesAt,
                    tokenExpiredAt:  d1.tokenExpiredAt,
                    cloudAccountId:  d1.cloudAccountId,
                    status: "active" //new status,
                }
        })
          
            
            
       // })

        console.log("user3 inside inside == "+ JSON.stringify(user3))
        // console.log("Pending status = " + profileStatus + "   "+ state.profileUuid)
        let params = null;
        params = new URLSearchParams('?id='+ id);
        response = await API.put("/api/profile/updateverify").catch((err) => {
            //setError(err.response.status);
            console.log("Here ERROR " + JSON.stringify(err))
        }).finally(() => {
            setLoading(false);
        });

        if (response.status >199 && response.status <300){
            console.log("uppdate password", response.status)
            setChangePassword(false);
            setIsReauthenticate(true);
            setPassword('')
        } else  {
            console.log(" DID NOT WORK uppdate password", response.status)
        }
    }

    function saveSession(obj) {
        sessionStorage.setItem("myObj", JSON.stringify(obj));
        return true;
      }

    const handleSubmit =  (e) => {

        let myProfile = null
        let isRootAdmin = false
        let myRole = ""
        
        console.log("SUCCESS DATA =", JSON.stringify(e.success))
        console.log("PROFILE DATA =", JSON.stringify(e))

        if (e.success == true) {
            
            

            
            //console.log("MY ROLE", myRole)
            myProfile = {
                rofileUuid: e.profileUuid,
                customerId: e.customerId,
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email,
                role: myRole,
                isRootAdmin: isRootAdmin,
                accessToken: e.accessToken,
                refreshToken: e.refreshToken,
                tokenIssuesAt: e.tokenIssuesAt,
                tokenExpiredAt: e.tokenExpiredAt
            } 
            

           // console.log("myprofile", myProfile)
            //console.log("ROLEE == ", e.role)


            const profile = {
                profileUuid: e.profileUuid,
                customerId: e.customerId,
                name: e.firstName + " " + e.lastName,
                email: e.email,
                role: e.role,
                accessToken: e.accessToken,
                refreshToken: e.refreshToken,
                tokenIssuesAt: e.tokenIssuesAt,
                tokenExpiredAt: e.tokenExpiredAt
            }

           // console.log("Profile===", myProfile.role)
            
            //saveSession(myProfile)

            //store session variable
            sessionStorage.setItem('profileData', [JSON.stringify(myProfile)])
            //setProfileState(myProfile)
            //setState(myProfile);
            setIsUserValid(true); //temp comment out 11/24

           return <Navigate replace to="/" />;
        }
       // e.preventDefault()
        
       //setGoAuthenticate(true) //temp comment out 11/24
        
        
        //await makePostAPICall();
       // if (response.data)
      //  console.log("my Ighedosa response " + JSON.stringify(e))

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

            {loading && 
               
                    <Spin tip="Authenticating, please wait" size="small">
                        <div className="content" />
                    </Spin>
                   
            }


      


        </div>
        <Space size={10} />
        <div className='create'>
        
   
        



        {/* {!loading && !error && apiResponse?.length &&
                <ul>
                    {JSON.stringify(apiResponse.lastname)}
                </ul>
            } */}
            
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