import React from "react";

const HtmlShowCountry = ({country}) => {
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

export default HtmlShowCountry