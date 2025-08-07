import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterValue, setFilterValue] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName,
    number: newNumber}
    if (persons.some(person => person['name'] === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilterValue} onChange={handleFilterChange}/>
      </div>
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
      <h2>Numbers</h2>
        {personsToShow.map(person =>
        <div key={person.name}>
        <p> {person['name']} {person['number']}</p>
        </div>
        )}
    </div>
  )

}

export default App
