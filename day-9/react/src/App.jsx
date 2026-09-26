import React, { useCallback, useState } from "react";
import ShowWeather from "./components/ShowWeather";
import FetchApi from "./customHooks/FetchApi";
import './App.css'

//  http://api.openweathermap.org/data/2.5/weather?id=524901&appid={API key}


const App = () => {

  const [cityName, setCityName] = useState("");
  const [searchQuery, setSearchQuery] = useState("London");
  const { data, loading, error } = FetchApi(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=d87dd0dc608a377c375ec6cb5eaf7435`
  );

  // handle click by using useCallback function

  const handleClick = useCallback(() => {
    setSearchQuery(cityName);
  }, [cityName]);

  // if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="main-container">
      <div>
        <h3>Search city</h3>

        <div>
          <input
            type="search"
            name="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
          />
        </div>
        <div>
          <button onClick={handleClick}>Serach</button>
        </div>
      </div>

      
      {/* Loading */}
      {
        loading && <div className="loading-container">Loading...</div>
      }

      {/*  Error message */}
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Enter correct city name
        </div>
      )}

      {/* Show data */}
      <div>{data && <ShowWeather data={data} />}</div>
    </div>
  );
};

export default App;
