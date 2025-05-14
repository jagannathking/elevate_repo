import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";

const Assignment1 = () => {
  const [name, setName] = useState("jagan");
  const [timeOfDay, setTimeOfDay] = useState(""); 

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 12) {
        setTimeOfDay("Good morning"); 
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("Good afternoon");
      } else {
        setTimeOfDay("Good evening");
      }
    };

    updateGreeting();
       
    const interval = setInterval(updateGreeting, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Greeting name={name} timeOfDay={timeOfDay} />
    </div>
  );
};

export default Assignment1;