import React from "react"

const HtmlForm = (props) => {

  return (
<form onSubmit={props.addPerson}>
      <table>
        <tbody>
        <tr>
          <td> Name: </td>
          <td> 
            <input value={props.newName}
          onChange={props.handleNameChange} /> 
          </td>
        </tr>
        <tr>
        <td> Number: </td> 
          <td>
        <input value={props.newNumber}
          onChange={props.handleNumberChange} />
          </td>
        </tr>
        <tr>
        <td>
          <button type="submit">add</button>
          </td>
          </tr>
          </tbody>
      </table> 
      </form>
  )
}

export default HtmlForm