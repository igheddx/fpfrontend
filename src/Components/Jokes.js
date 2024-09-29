import useAxios from "../hooks/useAxios";
import axios from '../apis/dadJokes';

 const Jokes = () => {

    const [joke, error, loading, refetch] = useAxios({
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
            {loading}
            {loading && <p>Loading...</p>}
            {!loading && !error && <p className="errMsg">Hi --- {error}</p>}
            {!loading && !error && joke &&  <p>asdfasd{joke}</p>}
            {!loading && !error && !joke && <p>No dad joke to display</p>}
            {<p>This is my joke --- {joke}</p>}

        </article>
        
    )

 }

 export default Jokes;