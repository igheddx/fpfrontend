import axios from "axios";
import useEncryptDecrypt from '../../apis/useEncryptDescrypt';

// const {data: encryptDecryptDataWithUserName, getEncryptDecryptWithUserName} = useEncryptDecrypt()
// const {data: encryptDecryptDataNoUserName, getEncryptDecryptNoUserName} = useEncryptDecrypt()

const axiosInstance = axios.create(
    {
        baseURL : 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws',
        //'accept': 'text/plain',
        //'Content-Type': 'application/json',
        //'Authorization': "Bearer " + accessToken,
        //'X-Api-Key': xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
    }
)

axios.interceptors.request.use(
    (config) => {
        //const token = localStorage.getItem('token');
        const token = sessionStorage.getItem('accessTokenData');
        let xApiKeyWithUserName = sessionStorage.getItem('xapikey')  //with user
        let xApiKeyDefault = sessionStorage.getItem('xapikeyNoAccessToken') //no username
        
        const xApiKey = ''
        if (xApiKeyDefault != "" ) {
            xApiKey = xApiKeyDefault
            console.log("LARA  NO USER NAME xAPIKEY =", xApiKey)
        } else {
            xApiKey = xApiKeyWithUserName 
            console.log("OGIE MAIN WITH USER NAME xAPIKEY =", xApiKey)
        }
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        config.defaults.headers.common['X-Api-Key'] = xApiKey;
        config.defaults.headers.common['accept'] = 'text/plain';
        config.defaults.headers.common['Content-Type'] = 'application/json';
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(

    response => {
        return response
    },
    error => {
        return Promise.reject(error);  
    }


   
);

export default axiosInstance
