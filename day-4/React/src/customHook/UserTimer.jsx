import React, { useEffect, useState } from 'react'

const UserTimer = (initTime = 0) => {
 const [time, setTime] = useState(initTime);

 useEffect(() => {
    
    let timer = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
             
    return () => clearInterval(timer)
 }, [])

  return time;
}

export default UserTimer