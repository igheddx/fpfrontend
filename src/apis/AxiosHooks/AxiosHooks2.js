
import { useState, useEffect } from "react";
import axios from "axios";



export function useAxios2(path, data, header1, method) {

    
    const [response, setResponse] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log("PATH= " + path)
    console.log("DATA = " + JSON.stringify(data))
    console.log("HEADER = " + header1)
    console.log("METHOD = " + method)
    

    // const API =  axios.create({
    //     //timeout: 20000,
    //     headers: {
    //         'Accept': 'text/plain',
    //         'Content-Type': 'application/json',
    //         'Authorization': '',
    //         'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
    //     },
    //     // method: "GET",
    //     // url: `/api/Resource/all/5/1`,

    // });

   

    const  makePostAPICalls = async () => {
        // setIsUserValid(false)
        setLoading(true)

        //const  bodyFormData = { "name":"John", "age":30, "city":"New York"};
       /* axios({
        method: 'POST',
        url: '/api/Customer/authenticate/',
        data: data,
        config: { headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': '',
            'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n', 
            }}
        })
            .then((response) => {
                console.log(response)
                setResponse(response)
            }) 
            .catch(error => {
                console.log( 'the error has occured: ' + error) 
                setError(error)
            }).finally(() => {
    
                setLoading(false)
                //setButtonName("Sign In")
                
            });
        }*/

        const options = {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': '',
                'X-Api-Key': header1,
            },
        }
        //setButtonName("Authenticating...")
        console.log("MakePostAPICalls was called")
        console.log("my header == " + header1)
        console.log("my data ==" + data)
        console.log("my path ==" + path)
        console.log("my options == " + options)
        
        await axios.post(path, data, options).then((res) => {
            setResponse(res.data)
            console.log("what is the status = " + res.data)
            //setLoginAPIResponse(res.data);
            
            console.log("status == " + res.status);
            console.log("BIG DATA = " + JSON.stringify(res.data))
        }).catch((err) => {
            setError(err)
            //setLoginAPIResponse(err);
            console.log("failure header = " + err.response.headers)
            console.log("failure error code = " + err.response.status)
            console.log("failed status == " + JSON.stringify(err.response.data));
        }).finally(() => {
    
            setLoading(false)
            //setButtonName("Sign In")
            
        }); 
    };

    const makeGETCalls=() => {
        setLoading(true)
         /*option 3 how to make api cal */
        axios.get(path ).then((res) => {
            setResponse(res.data);
            console.log("success")
        }).catch((err) => {
            setError(err);
        }).finally(() => {
            setLoading(false)
        });
    };

    useEffect(() => {
        console.log("My METHOD = " + method)
        // switch(method) {
        //     case 'POST':
        //       return makePostAPICalls();
        //     case "GET":
        //         return makeGETCalls();
        //     default:
        //       return '';
        //   }
        //makePostAPICalls();
    }, [header1]); // execute once only

    return { response, error, loading, makeGETCalls, makePostAPICalls  };
};
