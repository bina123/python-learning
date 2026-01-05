import { useState, useEffect } from "react";

/**
 * Custom hook for fetching data from API.
 * Like Laravel: a reusable service class
 * 
 * @param {string} url - API endpoint
 * @returns {object} { data, loading, error, refetch }
 */

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(url);
        if (!url) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else if (result.results) {
                    setData(result.results);
                } else {
                    setData(result);
                }
            } catch (error) {
                console.log(error.message);
                setError(error.message);
                setData(null);
            } finally {
                setLoading(false);

            }
        }

        fetchData();
    }, [url]);

    const refetch = () => {
        setLoading(true);
        setError(null);
    }

    return { data, loading, error, refetch };
}

export default useFetch;
