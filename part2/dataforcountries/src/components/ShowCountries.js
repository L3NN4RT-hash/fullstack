
import React from 'react'
import axios from 'axios'

const ShowCountries = ({countries}) => {
  
  if (Object.keys(countries).length>10 && Object.keys(countries).length>0) {
    return (<div>Too many matches, please specify</div>)
  } else if (Object.keys(countries).length===1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <table>
        <tbody>
        <tr>
          <td>Capital: </td><td>{country.capital}</td>
        </tr>
        <tr>
          <td>Area:</td><td>{country.area}</td>
        </tr>
        </tbody>
        </table>
        <p>
          <strong>Languages:</strong>
        </p>
        <ul>
        {Object.entries(country.languages).map(([key,value]) => <li key={key}>{value}</li>)}
        </ul>
       <img src={country.flags.png}/>
      </div>
    )
  }
 return(
   countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
  )
}

export default ShowCountries