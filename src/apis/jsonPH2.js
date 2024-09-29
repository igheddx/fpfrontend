import axios from 'axios';
const BASE_URL =   'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 
       
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': '',
        'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
  
    }
});