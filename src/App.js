import React, {useState} from 'react';

const api = {
  key: "c4f81e34104d7abd39c3af4d82052b85",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7",
                  "Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
    let days = ["Chủ Nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, Ngày ${date} ${month} Năm ${year}`;
  }

  return (
    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app-warm' : 'app') : 'app'}>
      <main>
        <div className="search-box"> 
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
