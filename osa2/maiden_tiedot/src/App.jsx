import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
  const showCountry = props.showCountry
  const setShowCountry = props.setShowCountry
  const weather = props.weather
  const setWeather = props.setWeather
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
  const imageUrl = 'https://openweathermap.org/img/wn/'
  const apiKey = import.meta.env.VITE_KEY

  const countriesToShow =  props.countries.filter((country) => country.name.common.toLowerCase().includes(props.filterValue.toLowerCase()))
  const getWeather = (country) => {
      axios
      .get(`${baseUrl}${country.capital}&appid=${apiKey}&units=metric`)
      .then((response) => {
        console.log('säätiedot haettu')
        console.log(response.data)
        setWeather(response.data)
        setShowCountry(country)
      })
  }


  if (showCountry){
    const image = `${imageUrl}${weather?.weather[0].icon}@2x.png`
    return (
      <div>
        <h1> {showCountry.name.common}</h1>
        <p>Capital: {showCountry.capital}</p>
        <p>Area: {showCountry.area}</p>
        <h2>Languages</h2>
        {Object.entries(showCountry.languages).map(([key, value]) =>
          <li key={key}>
            {value}
          </li>
        )}
        <p><img src={showCountry.flags.png}></img></p>
        <h2>Weather in {showCountry.capital}</h2>
        <p>Temperature {weather?.main?.temp} °C</p>
        <p>{weather?.weather[0].description}</p>
        <p><img src={image}></img></p>
        <p>Wind {weather?.wind.speed} m/s</p>
      </div>
    )
  }
  if (countriesToShow.length>10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countriesToShow.length===1){
    getWeather(countriesToShow[0])
    
  } else {
    return (
      <div>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
        <p> {country.name.common} <button onClick={ () => getWeather(country) }>{'Show'}</button></p>
        </div>
        )}
      </div>
    )}
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    setShowCountry(null)
    setWeather(null)
  }

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  return (
    <div>
        find countries <input value={filterValue} onChange={handleFilterChange}/>
        <Countries 
        countries={countries} 
        filterValue={filterValue} 
        setMessage={setMessage} 
        message={message} 
        setShowCountry={setShowCountry}
        showCountry={showCountry}
        setWeather={setWeather}
        weather={weather}></Countries>
    </div>
  )
}

export default App