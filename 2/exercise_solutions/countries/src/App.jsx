import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, []);

  useEffect(() => {
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(results);
  }, [query, countries]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for a country..."
      />
      <CountryList countries={filteredCountries} setQuery={setQuery} />
    </div>
  );
};

const CountryList = ({ countries, setQuery }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common} <button onClick={() => setQuery(country.name.common)}>show</button></li>
      ))}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [country.capital, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200px" />
      
      {weather ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
