import React, { useState } from "react";
import DashBorad from "./DashBorad";

const LoginMessage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("jagannath");

  return (
    <div>

      
      {
        isLoggedIn
      }
      {isLoggedIn === true? (<DashBorad name={name} setIsLoggedIn={setIsLoggedIn} />) :
      (
<div>
        <h3>Loagin page</h3>
        <div>
            <p>Please login</p>
        </div>
        <div>
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        </div>
      </div>
      )
      }
    </div>
  );
};

export default LoginMessage;
