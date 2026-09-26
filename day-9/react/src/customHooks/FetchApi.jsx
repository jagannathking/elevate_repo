import { useEffect, useState } from "react";

const FetchApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const weather = await res.json();

      if (!res.ok) {
        setError(weather.message || "Something went wrong");
        setData(null);

      } else {
        setData(weather);
        setError(null);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setData(null);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (url) fetchData();
  }, [url]);

  return { data, loading, error };
};

export default FetchApi;
