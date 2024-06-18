import { useState } from 'react'
import axios from 'axios';

const Numbers = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} person={person} />)}
    </ul>
  )
}

const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({nameFilter, setNameFilter, filteredPersons}) => {
  return (
    <div>
      filter shown with <input
        value={nameFilter}
        onChange={(event) => setNameFilter(event.target.value)}
      />
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([]);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    else {
      setPersons(persons.concat(personObject))
      axios
      .post('http://localhost:3001/persons', personObject) 
      .catch(error => console.log(error))
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    })
    }
  }

  const filterPeople = (event) => {
    const value = event.target.value;
    setNameFilter(value);
  
    setFilteredPersons( persons.filter(person => person.name.includes(value)))
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Filter</h3>
      <Filter nameFilter={nameFilter} setNameFilter={filterPeople} filteredPersons={filteredPersons} />

      <h3>Add new entry</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App