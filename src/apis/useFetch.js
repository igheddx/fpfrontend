
import {useState, useEfffect} from 'react'
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);


    return {data, isPending, error}

}
export default useFetch;