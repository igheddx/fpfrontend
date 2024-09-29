import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosFunction = () => {
   

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);

            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            console.log("DOMINIC", res);
            setResponse(res.data);
        } catch (err) {
            console.log("AWELEW", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        
        console.log(controller)
        // useEffect cleanup function
        return () => controller.abort();

        // eslint-disable-next-line
    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunction