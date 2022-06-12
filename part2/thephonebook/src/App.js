import { useEffect, useState } from 'react'
import ShowNumbers from './components/ShowNumbers'
import HtmlForm from './components/HtmlForm'
import React from 'react'
import axios from 'axios'
import Numbers from './services/Numbers'
import { getDefaultNormalizer } from '@testing-library/react'

// Only had two components to extract

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  
useEffect(() => {
      Numbers
      .getData()
      .then(people => {
      setPersons(people)
    },)
},[])  

  const hasSameName = () => {
    var same = persons.filter((person, index) => {
      return person.name === newName
    },0) 
    if (same.length == 0) {
      return (false)
    }
    return (true)
}

const changeNumber = (name) => {
  const personObject = persons.find(person => person.name === newName)
  const newPersonObject = {...personObject, number: newNumber}
  if (window.confirm(`${name} is already in phonebook. Would you like to replace the old number with this new one?`)) {
    Numbers
    .changeData(newPersonObject)
    .then(response => { console.log(response);
      setPersons(persons.map(person => person.id !== response.id ? person : response))
      setNewName('')
      setNewNumber('')
    })
  }
}

  const addPerson = (event) => {
    event.preventDefault()

      const nameObject = {
        name: newName,
        number: newNumber,
        visible: true
        /* Server sets id*/
      }

      if (hasSameName()) {
        return (
          changeNumber(newName)
        )
      }

      Numbers
      .postData(nameObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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

  const deleteNumber = (id,name) => {
    
    if (window.confirm(`Do you want to delete ${name}`)) {
      Numbers.deleteData(id)
      setPersons(persons.filter(person => person.id !== id))
      
    }
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
      {persons.map(person => <ShowNumbers key={person.id} person={person} deleteNumber={() => deleteNumber(person.id, person.name)} />)}
    </div>
  )
}

export default App
