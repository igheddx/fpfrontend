import axios from "axios"
import { useEffect, useState } from "react"
//import axiosInstance from "../../services/apiService"


const useApi = () => {
    const [response1, setResponse] = useState(null)
    const [error1, setError1] = useState("")
    const [loading1, setLoading1] = useState(false)
    const [status1, setStatus1] = useState("")

    const token = sessionStorage.getItem('accessTokenData');
    let xApiKeyWithUserName = sessionStorage.getItem('xapikey')  //with user
    let xApiKeyDefault = sessionStorage.getItem('xapikeyNoAccessToken') //no username
    
    console.log("@@TOKEN IGHEDOSA ==", token)

    let xApiKey = ''
    if (xApiKeyWithUserName != "" ) {
        xApiKey = xApiKeyWithUserName
        console.log("LARA  NO USER NAME xAPIKEY =", xApiKey)
    } else {
        xApiKey =  xApiKeyDefault
        console.log("OGIE MAIN WITH USER NAME xAPIKEY =", xApiKey)
    }

    console.log("XAPI IGHEDOSA ==", xApiKey)
    const axiosInstance = axios.create({
        baseURL : 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
            'X-Api-Key': xApiKey  //"CpUhVo+PeX1fhfxzSFLPdM637r2a5jDoAFnx5UyOORvePno1qvpcoeDmo56p04X9" //xApiKey //xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
        }
    })

    
    axiosInstance.interceptors.request.use((config) =>{
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (response) =>{
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    let controller = new AbortController()

    useEffect(() =>{

        return () => controller?.abort()
    }, [])


    const fetchData = async({url, method, data ={}, params ={}}) => {
        setLoading1(true)

        controller.abort()
        controller = new AbortController()

        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controller.signal
            })
            setResponse(result.data);
            setStatus1(result.status);
        } catch(error) {
            if(axios.isCancel(error)) {
                console.error("Request Cancelled", error.message)
            } else {
                setError1(error.response ? error.response.data : error.message);
            }
            
        } finally {
            setLoading1(false)
        }
    }
    return {response1, error1, loading1, status1, fetchData}
};
export default useApi;


/* This is different version


const useAPI = (url) => {

    const [data1, setData] = useState(null)
    const [loading1, setLoading] = useState(false)
    const [error1, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axiosInstance.get(url)
        .then(response =>{
            setData(response.data)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })

    }, [url])

    console.log("our data =", data1)
    return (data1 ={}, loading1, error1)
}

export default useAPI

*/