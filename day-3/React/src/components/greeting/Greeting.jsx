import React from 'react'

const Greeting = ({name, timeOfDay}) => {
    
  return (
    <div>

        <h1>Greeting</h1>

        <p>
          {timeOfDay} {name}
        </p>
    </div>
  )
}

export default Greeting