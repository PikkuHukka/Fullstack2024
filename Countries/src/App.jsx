import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'
import weatherService from './services/weather'





const SearchBar = props => {
  return (
    <div>
      <input value={props.search} onChange={props.searcHandler} />
    </div>
  );
};


const CountryList = props => {
  const filteredCountries = props.countries.filter(country =>
    country.name.common.toLowerCase().includes(props.search.toLowerCase())
  )
  if (filteredCountries.length > 10) {
    return (
      <div><p>Too many countries to show</p></div>
    )
  } else if (filteredCountries.length === 0) {
    return (<div><p>No countries found</p></div>
    )
  } else if (filteredCountries.length === 1) {
    return (<OneCountry country={filteredCountries[0]} />)
  } else {
    return (<MultipleCountries filteredCountries={filteredCountries} searchHandler={props.searchHandler} />)
  }
}

const MultipleCountries = props => {
  return (
    <div>
      <ul>
        {props.filteredCountries.map(country =>
          <li key={country.name.common}>{country.name.common}<button value={country.name.common} onClick={props.searchHandler}>Show</button></li>
        )}
      </ul>
    </div>
  )
}

const OneCountry = props => {

  const [weather, setWeather] = useState("");
  useEffect(() => {
    weatherService.get(props.country.capital[0])
      .then(response => {
        setWeather(response.data);
      });
  }, []);


  return (
    <div>

      <h3>{props.country.name.common}</h3>
      <p>capital: {props.country.capital[0]}</p>
      <p>area: {props.country.area}</p>
      <ul>
        {Object.values(props.country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={props.country.flags.png} />

      {weather ? (
        <div>
          <p>Temperature: {(weather.main.temp -273.15).toFixed(2)} celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>Wind: {(weather.wind.speed)} m/s</p>
        </div>
      ) :
        <p>loading weather data</p>}

    </div>
  )
}



function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])



  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <SearchBar search={search} searcHandler={handleSearchChange} />
      <CountryList search={search} searchHandler={handleSearchChange} countries={countries} setCountries={setCountries} />
    </div>

  )



}

export default App
