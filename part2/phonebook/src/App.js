import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  // const [isSamePerson, setIsSamePerson] = useState(false)

  const addNewName = (event) => {
    event.preventDefault();
    const isSame = persons.filter(person => newName === person.name)

    if (isSame.length > 0) 
        alert(`${newName} is already added to phonebook`)      
    else {
      const newPerson = {
          name: newName,
          id: persons.length + 1,
          number: newPhone
        }
    
        setPersons(persons.concat(newPerson))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const namesToShow = newSearch ? 
    persons.filter(person => !!person.name.toLowerCase().includes(newSearch.toLowerCase())) :
    persons

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  console.log(namesToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <span>filter shown with </span>
      <Filter value={newSearch} handleNewSearch={handleNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName} 
        newPhone={newPhone} 
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addNewName={addNewName}
        />
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map((person) => 
          <Persons key={person.id} name={person.name} number={person.number}/>
        )}
      </ul>
    </div>
  )
}

export default App