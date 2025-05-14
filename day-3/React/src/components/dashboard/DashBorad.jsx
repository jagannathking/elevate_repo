import React from 'react'

const DashBorad = ({name, setIsLoggedIn}) => {
  return (
    <div>
       <h2>Dashboard</h2>
       <p>Welcome back, {name}!</p>

       <div>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
       </div>
    </div>
  )
}

export default DashBorad
 