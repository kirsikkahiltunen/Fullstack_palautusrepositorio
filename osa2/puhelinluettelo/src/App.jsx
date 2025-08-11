import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {

  const [newFilterValue, setFilterValue] = useState('')

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    props.setSharedFilter(event.target.value)
  }

  return (
    <div>
        filter shown with <input value={newFilterValue} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName,
    number: newNumber}
    if (props.persons.some(person => person['name'] === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
    personService
      .addNew(nameObject)
      .then(response => {
        props.setPersons(props.persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit= {addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
  )

}

const Persons = (props) => {

  const personsToShow =  props.persons.filter((person) => person.name.toLowerCase().includes(props.sharedFilter.toLowerCase()))

  return (
    <div>
    {personsToShow.map(person =>
      <div key={person.name}>
      <p> {person['name']} {person['number']}</p>
      </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [sharedFilter, setSharedFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setSharedFilter={setSharedFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} sharedFilter={sharedFilter}></Persons>
    </div>
  )

}

export default App
