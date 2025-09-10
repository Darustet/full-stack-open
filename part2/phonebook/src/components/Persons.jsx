import personsService from '../services/persons'

const Persons = (props) => {
  const { persons, newSearch, setPersons } = props

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personsService
      .deletePerson(id)
      .then((responseData) => {
        console.log(responseData)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons