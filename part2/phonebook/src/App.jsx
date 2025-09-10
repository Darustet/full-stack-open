import { useState, useEffect } from 'react'
import personsService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState('notification')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const formProps = {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    handleNameChange,
    handleNumberChange,
    setMessage,
    setStyle
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <FilterForm newSearch={newSearch} handleNewSearch={handleNewSearch} setMessage={setMessage}/>
      <h3>Add a new</h3>
      <PersonForm {...formProps}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}/>
    </div>
  )
}

export default App