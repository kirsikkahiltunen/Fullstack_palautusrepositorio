import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
  const showCountry = props.showCountry
  const setShowCountry = props.setShowCountry
  const countriesToShow =  props.countries.filter((country) => country.name.common.toLowerCase().includes(props.filterValue.toLowerCase()))

  if (showCountry){
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
      </div>
    )
  }
  if (countriesToShow.length>10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (countriesToShow.length===1){
    return (
      <div>
        {countriesToShow.map(country =>
        <div key={country.name.common}>
        <h1> {country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        {Object.entries(country.languages).map(([key, value]) =>
          <li key={key}>
            {value}
          </li>
        )}
        <p><img src={country.flags.png}></img></p>
        </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
        <p> {country.name.common} <button onClick={ () => setShowCountry(country) }>{'Show'}</button></p>
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

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    setShowCountry(null)
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
        showCountry={showCountry}></Countries>
    </div>
  )
}

export default App