import { useEffect, useState } from "react";
import ShowNumbers from "./components/ShowNumbers";
import HtmlForm from "./components/HtmlForm";
import React from "react";
import axios from "axios";
import Numbers from "./services/Numbers";
import { getDefaultNormalizer } from "@testing-library/react";
import Success from "./components/OperationSuccess";
import Error from "./components/Error";

// Only had two components to extract

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    Numbers.getData().then((people) => {
      setPersons(people);
    });
  }, []);

  const hasSameName = () => {
    var same = persons.filter((person, index) => {
      return person.name === newName;
    }, 0);
    if (same.length == 0) {
      return false;
    }
    return true;
  };

  const changeNumber = (name) => {
    const personObject = persons.find((person) => person.name === newName);
    const newPersonObject = { ...personObject, number: newNumber };

    if (
      window.confirm(
        `${name} is already in phonebook. Would you like to replace the old number with this new one?`
      )
    ) {
      const nameHolder = newName;
      Numbers.changeData(newPersonObject)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          setSuccessMessage(`Number of ${newName} changed to ${newNumber}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(
            `${nameHolder} doesn't exist in the phonebook or it has been removed`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      visible: true,
      /* Server sets id*/
    };

    if (hasSameName()) {
      return changeNumber(newName);
    }

    Numbers.postData(nameObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`${newName} added to the phonebook`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage("Name is under 3 characters or number is not in correct format");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
    const input = event.target.value.toLowerCase();
    persons.forEach((person) => {
      if (!person.name.toLowerCase().includes(input)) {
        person.visible = false;
      } else if (person.name.toLowerCase().includes(input)) {
        person.visible = true;
      }
    });
  };

  const deleteNumber = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      Numbers.deleteData(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <Error message={errorMessage} />
      <br />
      Search: <input value={search} onChange={handleSearch} />
      <h3>Add a new name and number</h3>
      <HtmlForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <ShowNumbers
          key={person.id}
          person={person}
          deleteNumber={() => deleteNumber(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default App;
