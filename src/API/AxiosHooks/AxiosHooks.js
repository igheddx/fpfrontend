import { useState, useEffect } from "react";
import axios from "axios";


// axios.defaults.baseURL = "https://kee2wx4p2lbovtwqpn5c7urhtq0faonv.lambda-url.us-east-2.on.aws";

export function useAxiosGet(url) {
    const [data, setData] = useState();
    useEffect(() => {
        axios
           .get(url)
           .then((response) => setData(response.data))
           .catch((error) => console.error(error));
    }, [url]);
   return data;
}




export function useAxiosPost() {
    const [input, setInput] = useState({
       data: null,
       url: null,
       callback: null,
       header: {
            'Accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': '',
            'X-Api-Key': 'uKxGOdeVGpNxWRbRH9qofN21kQDht4FrpsqIaMcaamdyLGFeg3MvoZiBwOQ6OO7n',
       }
    });
    useEffect(() => {
        const postData = () => {
            axios
              .post(input.url, input.data)
              .then(res => input.callback(res.data))
              .catch(err => console.error(err));
        };
        
        if(input.data && input.url && input.callback) {
            postData();
        }
        else {
            console.log('Invalid arguments provided to post method');
        }
   }, [input]);
   const post = (url, data, callback) => {
       setInput({ url, data, callback });
   }
   return post;
 }