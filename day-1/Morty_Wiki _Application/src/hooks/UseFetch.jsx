import React, { useEffect, useState } from "react";

const UseFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const result = await res.json();

      setData(result);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setData(null);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  console.log("data in UseFetch : ", data);
  return {
    data,
    loading,
    error,
  };
};

export default UseFetch;
