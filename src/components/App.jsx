import React, { useState } from "react";
import keys from "../keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};
// const api = {
//   key: "0e13d0f68316bf98922a10347d801b89",
//   base: "https://api.openweathermap.org/data/2.5/",
// };
function App(){

  
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  
  const dateBuilder = (dt) =>{
    let months = ["January", "February", 'March',"April", "May", "June", "July", "August", "September", "October"
  ,"November", "December"]
  let days= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  let day = days[dt.getDay()];
  let date = dt.getDate()
  let month = months[dt.getMonth()]
  let year = dt.getFullYear();

  return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp> 16)? 'app warm' : 'app'): 'app'}>
      <main>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-container">
          <div className="location">{weather.name}, {weather.sys.countrry}</div>
          <div className="date">{dateBuilder (new Date())}</div>
        </div>

        <div className="weather-container">
          <div className="temperature">
            {Math.round(weather.main.temp)}
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ): ('')}
      </main>
    </div>
  )
}

export default App;
