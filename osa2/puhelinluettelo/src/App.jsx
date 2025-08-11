import { useState, useEffect } from 'react'
import personService from './services/persons'
import persons from './services/persons'

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
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const targetPerson = props.persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
        personService
        .changeNumber(targetPerson.id, nameObject)
        .then(response => {
          props.setPersons(props.persons.map(person => person.id !== targetPerson.id
            ? person
            : response.data))
          setNewName('')
          setNewNumber('')
      })
      } else {
        console.log('the number was not replaced')
      }

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

  const deletePerson = (person) => {
    if (confirm(`Do you want to delete ${person.name}?`)){
      console.log(`person with id: ${person.id} needs to be deleted`)
      personService
        .deleteNumber(person.id)
        .then(() => {
          console.log(`${person.name} deleted`)
          props.setPersons(numbers => numbers.filter( number => number.id !== person.id))
        })
    }
    else {
      console.log('Person was not deleted')
    }
    
  }

  return (
    <div>
    {personsToShow.map(person =>
      <div key={person.name}>
      <p> {person['name']} {person['number']} <button onClick={ () => deletePerson(person) }>{'delete'}</button></p>
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
      <Persons persons={persons} setPersons={setPersons} sharedFilter={sharedFilter}></Persons>
    </div>
  )

}

export default App
