import axios from 'axios';
const BASE_URL =   'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws';
//const BASE_URL =   'https://icanhazdadjoke.com';

// export default axios.create({
//     baseURL: BASE_URL,
//     headers: { 
       
//         'Accept': 'text/plain',
//         'Content-Type': 'application/json',
//          'Authorization': '',
//          'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
//         // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
//         // 'Access-Control-Allow-Origin': 'http://localhost:3000',
  
//     }
// });



//import axios from 'axios';
//const BASE_URL = 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws';

/*
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
} */

    // console.log("XAPI IGHEDOSA ==", xApiKey)
    // const axiosInstance = axios.create({
    //     baseURL : 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws',
    //     headers: {
    //         'accept': 'text/plain',
    //         'Content-Type': 'application/json',
    //         'Authorization': "Bearer " + token,
    //         'X-Api-Key': xApiKey  //"CpUhVo+PeX1fhfxzSFLPdM637r2a5jDoAFnx5UyOORvePno1qvpcoeDmo56p04X9" //xApiKey //xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
   
    //     }
    // })

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        
        'Content-Type': 'application/json',
        'Accept': 'applicaton/json',
        //'Authorization': "Bearer " + token,
        //'X-Api-Key': xApiKey,  //"CpUhVo+PeX1fhfxzSFLPdM637r2a5jDoAFnx5UyOORvePno1qvpcoeDmo56p04X9" //xApiKey //xapiKeyWithUserName, //'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',

    }
});