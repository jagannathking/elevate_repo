import React, { useEffect, useState } from "react";

const Debounce = (value, delay) => {
  const [debounceQuery, setDebounceQuery] = useState(value);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setDebounceQuery(value);
    }, delay);

    return () => clearTimeout(timer);


  }, [value, delay]);


  return debounceQuery
};

export default Debounce;
