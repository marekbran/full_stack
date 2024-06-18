import { useState, useEffect } from 'react'
import phonebookServices from './services/phonebookServices'

const Numbers = ({persons, setPersons}) => {
  const delet = (event, personId) => {
    event.preventDefault()
    if (window.confirm(`Delete ${persons.find(p => p.id === personId).name}?`)) {
      phonebookServices.del(personId).then(() => {
        setPersons(persons.filter(p => p.id !== personId))
      })
    }
  }

  return (
    <div>
      {persons.map(person => (
        <form key={person.id} onSubmit={(event) => delet(event, person.id)}>
          <div>
            <li>{person.name} {person.number} <button type="submit">delete</button></li>
          </div>
        </form>
      ))}
    </div>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    phonebookServices.getAll()
      .then(initialPeople => setPersons(initialPeople))
      .catch(error => console.log(error));
  }, []);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    else if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookServices.update(persons.find(person => person.name === newName).id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        }).catch(error => {
          console.log(error.response.data)
        })
        setNewName('')
        setNewNumber('')
      }
    }
    else {
        phonebookServices.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        }).catch(error => {
          console.log(error.response.data)
        })
        setNewName('')
        setNewNumber('')
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
      <Numbers persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App