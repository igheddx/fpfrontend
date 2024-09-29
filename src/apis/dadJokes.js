import axios from "axios";
const BASE_URL =   'https://icanhazdadjoke.com';
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        
        // 'Content-Type': 'application/json',
        // 'Accept': 'applicaton/json',

        'accept': 'text/plain',
        'Content-Type': 'application/json',
    }
});