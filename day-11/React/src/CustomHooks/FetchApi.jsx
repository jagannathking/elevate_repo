import React, { useEffect, useState } from 'react'

const FetchApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const fetchData = async() => {
         
        setLoading(true);

        try{
         const res = await fetch(url)
         const userData = await res.json();
         setData(userData.users);
         
         setLoading(false);

        }catch(error){
           setError(error.message || "Error while fetching api");
           setData(null);
           setLoading(false);
        }
    }
   
   useEffect(() => {
    fetchData()
   }, [url])

  return {data, loading, error}
}

export default FetchApi