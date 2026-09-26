import React from 'react'

const ShowWeather =React.memo(({data}) => {
 
  console.log("Weather data", data);
  return (
    <div>
      <h4>City : {data.name}</h4>

      <div>
        <p>Temperature: {data?.main?.temp}</p>
        <p>Min Temp : {data?.main?.temp_min}</p>
        <p>Max Temp : {data?.main?.temp_max}</p>
        <p>Pressure : {data?.main?.pressure}</p>
      </div>

    </div>
  )

})

export default ShowWeather
