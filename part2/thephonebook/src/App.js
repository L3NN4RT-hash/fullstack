import { useEffect, useState } from 'react'
import ShowNumbers from './components/ShowNumbers'
import HtmlForm from './components/HtmlForm'
import React from 'react'
import axios from 'axios'

// Only had two components to extract

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  
useEffect(() => {
  console.log('useEffect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('then works')
      setPersons(response.data)
    },)
},[])  
console.log('persons on list:', persons.length)

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
        id: persons.length + 1,
        visible: true
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
    persons.forEach(person => {
     if (!person.name.toLowerCase().includes(input)) {
        person.visible = false
     } else if (person.name.toLowerCase().includes(input)) {
       person.visible = true
     }
    })    
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      Search: <input value={search}
              onChange={handleSearch} />
      <h3>Add a new name and number</h3>
      <HtmlForm addPerson={addPerson} handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} newName={newName}
      newNumber={newNumber} />
      <h2>Numbers</h2>
      <ShowNumbers people={persons} />
    </div>
  )
}

export default App
