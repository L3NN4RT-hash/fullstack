
import React from 'react'
import HtmlShowCountry from './HtmlShowCountry'


const ShowCountries = ({countries}) => {

  if (Object.keys(countries).length>10 && Object.keys(countries).length>0) {
    return (<div>Too many matches, please specify</div>)
  } else if (Object.keys(countries).length===1) {
    const country = countries[0]
    return (
      <HtmlShowCountry country={country}/>
    )
  } 

const handleClick = (country) => {
  console.log(country);
    return (
      <div>
      <HtmlShowCountry country={country}/>
      </div>
    )
}

 return(
   countries.map(country => <div key={country.name.common}>{country.name.common} &nbsp;
    <button onClick={()=>handleClick(country)}>Show</button></div>)
  )
}

export default ShowCountries