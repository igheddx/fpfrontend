import React from 'react'
import index from './../Logins/index.css'
import { useState, useEffect } from 'react'
import useBearStore from "../../state/state";
//import useFetch from '../../API/useFetch';
import useEncryptDecrypt from '../../API/useEncryptDescrypt';

import { useAxiosPost } from '../../API/AxiosHooks/AxiosHooks'
import { useAxios2 } from '../../API/AxiosHooks/AxiosHooks2';

import { json } from 'react-router-dom';
import EncryptDecrypt from '../../API/useEncryptDescrypt';

import useAxiosFunction from '../../API/useAxiosFunctions';
import axios from '../../API/jsonPH';

function Signin2() {
    //const {data, isPending, error} = useFetch('')
    
    const [response, error, loading, axiosFetch] = useAxiosFunction();

    const getData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: 'get',
            url: '/posts'
        });
    }


    useEffect(() => {
        //getData();
        // eslint-disable-next-line 
    }, [])


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

    const {data: encryptDecryptData, getEncryptDecrypt} = useEncryptDecrypt()
    const [loginAPIResponse, setLoginAPIResponse] = useState(profileStruct)
    const setIsUserValid = useBearStore((state) => state.setIsUserValid);
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    let profile = {username, password}
    const [data, setData] = useState();
    const [loading2, setLoading2] = useState(false)
    const [buttonName, setButtonName] = useState("Sign In")

    const [path, setPath] = useState('')
    const [data1, setData1] = useState()
    const [header1, setHeader1] = useState('')
    const [method, setMethod] = useState('')


    
    console.log("onload = " + method)
    console.log("api key = " + encryptDecryptData)
    // // dummy url for posting data
    // const url = "/api/Customer/authenticate/";

    // const post = useAxiosPost();
    

    // const handlePostData = () => {
    //     post(
    //     url,
    //     {
    //         userName: "johntravolta",
    //         password: "pass1234",
    //     },
    //     (data) => {
    //         setData(data)
    //         console.log("returned data = " + data);
    //     }
    //     );
    // };
   
    //et apikey = 
    useEffect(() => {
        getEncryptDecrypt();
        setHeader1(encryptDecryptData)
    }, []);


   
    console.log("header1 === " + header1)

    
    // const { response, loading, error } = useAxios({
    //     method: 'post',
    //     url: '/api/Customer/authenticate/',
    //     headers: JSON.stringify({ 
    //         'Accept': 'text/plain', 
    //         'Content-Type': 'application/json',
    //         'Authorization': '',
    //         'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
    //     }),
    //     body: JSON.stringify(profile),
    // });

    // const API =  axios.create({
    //     timeout: 20000,
    //     headers: {
    //         'Accept': 'text/plain',
    //         'Content-Type': 'application/json',
    //         'Authorization': '',
    //         'X-Api-Key': header1, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
    //     },
    //     // method: "GET",
    //     // url: `/api/Resource/all/5/1`,

    // });

    // const { response, loading, error } = useAxios({
    //     method: 'POST',
    //     url: '/api/Customer/authenticate/',
    //     headers: { // no need to stringify
    //         'Accept': 'text/plain', 
    //         'Content-Type': 'application/json',
    //         'Authorization': '',
    //         'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
    //     },
    //     data: {  // no need to stringify
    //         username: username,
    //         password: password,
    //     },
    // });

   
    //  useEffect(() => {
        
    //     // console.log("response == " + JSON.stringify(response))
    //     // console.log("error == " + JSON.stringify(error))
    //     // console.log("laoding == " + JSON.stringify(loading))
        
        
    //    // console.log("login response from useffect = "+ JSON.stringify(loginAPIResponse))
    //     if (loginAPIResponse.success == true) {
    //         setIsUserValid(true);
    //     } else {
    //         setIsUserValid(false);
    //     }
    //  }, [loginAPIResponse]);


    //  const getAPIKey = async() => {
        
    //  }

    const onFinish = () => {
       
    }
    const processLogin = (event) => {
        //event.preventDefault();
    
    //     console.log("username  " +  userName)
    //     console.log("password " +  password)
        
    //    // const checkUser = tempLoginUsers.filter(login => login.userName === userName && login.password == password);
    
        
    //     //console.log("will be know thwe status= " + checkUser.map(user => user.userName))
    //     const isVerified = checkUser.map(user => user.userName)
    //     if (isVerified != ""){
    //         console.log("authorized")
    //         setIsUserValid(true);
    //     } else {
    //         console.log("NOT authorized")
    //         setIsUserValid(false);
    //     }
    
       
    //     const dbPassword = "testtest";
    //     console.log("username asdfasdfsd= " + userName)
    //     console.log("password = " + password)
    //     // ... do something with email
    };
  
    //const { response, error, loading, makeGETCalls, makePostAPICalls } =useAxios2()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("IGHEDOSA")
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/api/Customer/authenticate',
            requestConfig: {
                data: {
                    username: username,
                    password: password
                },
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                    'Authorization': '',
                    'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n'
                    
                  
                }
            }
        });

        console.log(JSON.stringify(response))
        console.log(JSON.stringify(error))
        console.log("loading ==" + loading)
        
        
    }



    // const  handleSubmit =(e) => {
    //     e.preventDefault()
        
    //     setPath("/api/Customer/authenticate/");
    //     setData1({username: username, password: password});
    //     setHeader1(encryptDecryptData);
    //     console.log("my api key 2 ==" + header1)
    //     console.log("my api key 3 ==" + encryptDecryptData)
        
    //     console.log(username + "    " + password)
    //     setMethod('POST');
    //     //makePostAPICalls()

        
       
        

    //     console.log("encrypted data === " + encryptDecryptData)
    //     //getAPIKey()
        
    //     // console.log("Hello world")
       
    //     // if (response !== null) {
    //     //     setData(response);
    //     //     console.log("login successful = " + data)
    //     // } else {
    //     //     console.log("failed" + error) 
    //     // }

    // }
   
    //path, data1, encryptDecryptData, method
  return (
    <div className='create'>
        <h2>Login</h2>
        <h4>{loading == true? "authenticating, please wait...": "" }</h4>
        {loading && <p>Loading...</p>}

        {!loading && error && <p className="errMsg">{error}</p>}

        {!loading && !error && response?.length &&
                <ul>
                    {JSON.stringify(response)}
                </ul>
            }
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
            <label>Password:</label>
            <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button  >Sign In</button>

        </form>
        {username}
        {password}



    </div>
  )
}

export default Signin2;