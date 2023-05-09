import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  // const [isSamePerson, setIsSamePerson] = useState(false)

  useEffect(() => {
    console.log('effect')
    PersonsService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault();
    const isSame = persons.filter(person => newName === person.name)
    const newPerson = {
      name: newName,
      id: persons.length + 1,
      number: newPhone
    }
    if (isSame.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {

        window.open(PersonsService.update(isSame[0].id, newPerson), "Thanks for Visiting!");
      }
    }
    else {    
        setPersons(PersonsService.create(newPerson).then(person => person))
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
          <Persons key={person.id} name={person.name} number={person.number} id={person.id}/>
        )}
      </ul>
    </div>
  )
}

export default App