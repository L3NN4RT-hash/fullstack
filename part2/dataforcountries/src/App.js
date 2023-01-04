import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {
  const [search, setNewSearch] = useState('')
  const [countries, setData] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  
  console.log('app rerenders')

  useEffect(() => {
    console.log('useEffect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('then works')
        setData(response.data)
      },)
  },[])  

  const handleSearch = (event) => {
    setNewSearch(event.target.value) 
    const input = event.target.value.toLowerCase()
    console.log(input)
    var countriesToShow = countries.filter(country =>
      country.name.common.toLowerCase().includes(input) )
    console.log(countriesToShow)
    setShownCountries(countriesToShow)
  }
  
  const handleClick = (country) => {
    var counts = [country]
      setShownCountries(counts)     
      
  }

  return (
    <div>
      Find countries: <input value={search}
              onChange={handleSearch} />
      <ShowCountries countries={shownCountries} handleClick={handleClick} />
    </div>
  );
}

export default App;
