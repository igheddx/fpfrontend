import useAxios from "../hooks/useAxios";
import axios from '../apis/dadJokes';

 //const Jokes2 = () => {

function Jokes2() {

    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
        requestConfig: {
            'Content-Language': 'en-US',
        }
    })
    return (
        <article>
            <h2>Random Dad</h2>
            {loading && <p>Loading...</p>}
            {!loading && !error && <p className="errMsg">My err - {error}</p>}
            {!loading && !error && response && <p>{response?.joke}</p>}
            {!loading && !error && !response && <p>No dad joke to display</p>}
            { <p>Hi {response}</p>}

        </article>
        
    )

 }

 export default Jokes2;