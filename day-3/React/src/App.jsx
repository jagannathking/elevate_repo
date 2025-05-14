import React, { useState } from "react";
import Assignment1 from "./components/greeting/Assignment1";
import Assignment2 from "./components/profile/Assignment2";
import LoginMessage from "./components/dashboard/LoginMessage";


const App = () => {


  return <div>

     <div>
     {/* Greeting component */}
     {/* <Assignment1 /> */}
     </div>

     <div>
      {/* Prfile component */}
      {/* <Assignment2 /> */}
     </div>

     <div>
      {/* dashboard */}
      <LoginMessage />
     </div>
  </div>;
};

export default App;
