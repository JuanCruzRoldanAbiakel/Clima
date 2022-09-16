import Search from './components/search/search'
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/forecast/forecast';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setCurrentForecast({ city: searchData.value, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      })
  };
  //console.log(currentWeather);
  //console.log(currentForecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {currentForecast && <Forecast data={currentForecast} />}
      <footer>
        <p>Aplicación Programada por 👉 <a href="https://portafolio-abiakel.netlify.app">Juan Cruz Roldan Abiakel</a></p>
    </footer>
    </div>
  );
}
export default App;
