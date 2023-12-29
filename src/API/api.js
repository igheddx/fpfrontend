import axios from 'axios';
const BASE_URL = 'https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});