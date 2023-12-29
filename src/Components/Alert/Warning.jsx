import React from 'react'
import { useState, useEffect } from 'react'
import { Alert, Space } from "antd";


function Warning(propsMessageCode) {


  const data = [
    {
      code: 1,
      message: "Please login with your updated credentials.",
      type: "info"
    },
    {
      code: 2,
      message: "Incorrect username or password. Pleasae try again.",
      type: "error"
    },
    {
      code: 3,
      message: "Welcome, new user. Please change password to continue.",
      type: "info"
    },
    {
      code: 4,
      message: "Something went wron. Please try again.",
      type: "warning"
    },
    {
      code: 5,
      message: "Please login with your updated credentials",
      type: "info"
    },
    
    {
      code: 5,
      message: "Do something2",
      type: "warning"
    },
    
  ]
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageCode, setMessageCode] = useState(0);

  useEffect(() => {


    /*filter the message data based on message code passed to this component*/
    const filterData = data.filter(msg => msg.code == propsMessageCode.data);
    console.log("filteredMessage",filterData)

    /*assign final value to variable*/
    filterData.map((alertData) => {
      setMessage(alertData.message);
      setMessageType(alertData.type)
      setMessageCode(alertData.code)
    })
    
}, []);




console.log("My message", messageType)
  
  const setDataSource = () => {
  

    //console.log("My message", propsMessage.data)
    //})
    

  }

  
  return (
    <>
     {
      messageType == "warning" ?  
        <Alert
          message={message}
          description=""
          type={messageType}
          style={{width: '100%;'}}
          showIcon
          closable
        />
      :  null
     }

    {
      messageType == "success" ?  
        <Alert
          message={message}
          description=""
          type={messageType}
          style={{width: '100%;'}}
          showIcon
          closable
        />
      :  null
     }

    {
      messageType == "error" ?  
        <Alert
          message={message}
          description=""
          type={messageType}
          style={{width: '100%;'}}
          showIcon
          closable
        />
      :  null
     }

    {
      messageType == "info" ?  
        <Alert
          message={message}
          description=""
          type={messageType}
          style={{width: '100%;'}}
          showIcon
          closable
        />
      :  null
     }    
    </>
   // console.log("message", props)
 

   
    
  
  
  )
}

export default Warning

