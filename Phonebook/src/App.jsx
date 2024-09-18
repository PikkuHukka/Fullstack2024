import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'


const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}


const SuccessNotification = ({ successMessage }) => {
  if (successMessage === null) {
    return null
  }

  return (
    <div className="success">
      {successMessage}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)



  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name == newName);

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { name: newName, number: newPhone }

        personService
          .update(found.id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setNewPhone('')
            setNewName('')
            setSuccessMessage(
              `'${newName}' was updated!`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${newName}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            const filteredPersons = persons.filter(person => person.id !== found.id)
            setPersons(filteredPersons)

          })


      }

    }
    else {
      const personObject = { name: newName, number: newPhone }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewPhone('')
          setNewName('')
          setSuccessMessage(
            `'${newName}' was added!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }


  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {

      personService.remove(id)
        .then(() => {
          const filteredPersons = persons.filter(person => person.id !== id)
          setPersons(filteredPersons)
          setSuccessMessage(
            `'${name}' was removed!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
        )
    }
  }




  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }



  return (
    <div>
      <ErrorNotification errorMessage={errorMessage}/>
      <SuccessNotification successMessage={successMessage}/>
      
      <h2>Phonebook</h2>
      filter shown with: <input
        value={filter} onChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        name: <input
          value={newName} onChange={handleNewName}
        />
        phone: <input
          value={newPhone} onChange={handleNumberChange}
        />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.includes(filter)).map(person =>
          <li key={person.id}>
            {person.name} : {person.number}
            <button type="submit" onClick={() => deletePerson(person.id, person.name)} >Delete</button>
          </li>

        )}
      </ul>
    </div>
  )


}
export default App