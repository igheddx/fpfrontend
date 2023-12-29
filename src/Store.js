import React from 'react'
import { useState } from 'react'

// const initialState = {
   
//     firstName: "Dominic",
//     lastName: "Ighedosa",
//     email: "dominic@me.com",
//     title: "",
//     username: "dominic@me.com",
//     password: "pass1234",
//     role: "admin",
//     profileUuid: "U*#JDEKDKDJ",
//     customerId: 1,
//     accessToken: "DDDDEEEEDFD",
//     refreshToken: "EEEEFFFFGGGG",
//     tokenIssuesAt: "08/5/2023",
//     tokenExpiredAt: "08/5/2023",
//     cloudAccountId: "0",
//     status: "",
//     id: 0,
// };

const initialState = []

export const Context = React.createContext();


const Store = ({ children}) => {
    const [state, setState] = useState(initialState);
    console.log("Initializer value =", initialState)
    return (
        
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
};

export default Store;

