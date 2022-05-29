import { useState } from 'react'
import React from 'react'

const ShowNumbers = ({people}) => {
 return( people.map(person => <div key={person.id}>
    {person.name} {person.number}
  </div>))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: 123456789,
      id: 1,
      visible: true
    },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, visible: true },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, visible: true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, visible: true }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  

  const hasSameName = () => {
      var same = persons.filter((name1, index) => {
        return name1.name === newName
      },0) 
      if (same.length == 0) {
        return (false)
      }
      return (true)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (hasSameName()) {
      return (
        window.alert(`Im sorry, ${newName} is already in phonebook`)
      )
    }
      console.log('form submit', event.target);
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }

  const handleNameChange = (event) => {
    console.log(event.target)
    setNewName(event.target.value)    
  } 

  const handleNumberChange = (event) => {
    console.log(event.target)
    setNewNumber(event.target.value)    
  } 

  const handleSearch = (event) => {
    setNewSearch(event.target.value) 
    const input = event.target.value.toLowerCase()
    console.log(input)
    persons.forEach(person => {
      console.log(person.name.toLowerCase().includes(input))
    })    
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      Search: <input value={search}
              onChange={handleSearch} />
      <h3>Add a new name and number</h3>
      <form onSubmit={addPerson}>
      <table>
        <tbody>
        <tr>
          <td> name: </td>
          <td> 
            <input value={newName}
          onChange={handleNameChange} /> 
          </td>
        </tr>
        <tr>
        <td> number: </td> 
          <td>
        <input value={newNumber}
          onChange={handleNumberChange} />
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
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <ShowNumbers people={persons} />
    </div>
  )
}

export default App
