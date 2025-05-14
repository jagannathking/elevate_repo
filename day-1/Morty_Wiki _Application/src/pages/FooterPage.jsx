import React, { useEffect, useState } from "react";

const FooterPage = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date();
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");

      setCurrentTime(`${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    
    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <p>Footer</p>
      <p>Current Time: {currentTime}</p>
    </div>
  );
};

export default FooterPage;
