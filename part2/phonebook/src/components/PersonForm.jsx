import personsService from '../services/persons'

const PersonForm = (props) => {
  const { persons, setPersons, newName, setNewName, newNumber, setNewNumber, handleNameChange, handleNumberChange, setMessage, setStyle } = props

  const timeout = () => {
    setTimeout(() => {
      setMessage(null)
      setStyle('notification')
    }, 5000)
    }

  const addName = (props) => {
    props.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace their number?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            setStyle('error')
            setMessage(`Information of ${newName} has already been removed from server`)
            timeout()
          })
        setMessage(`Updated ${newName}'s number`)
        timeout()
      }
      return 
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    setMessage(`${newName} added to phonebook`)
    timeout()
  }

  return (
    <form id="inputs" onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm