import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState('Something went wrong')
    const [errorStatus, setErrorStatus] = useState(false)
    
    const getList = () => {
        PersonsService
        .getAll()
        .then(personList => {
            setPersons(personList)
        })
    }
    
    useEffect(() => {
        console.log('effect')
        getList()
    }, [])
    
    const clearFields = () => {
        setNewName("")
        setNewPhone("")
    }
    
    const addNewName = (event) => {
        event.preventDefault();
        
        const isSame = persons.filter(person => newName === person.name)
        const newPerson = {
            name: newName,
            number: newPhone
        }
        
        if (isSame.length > 0 && window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)) {
            PersonsService
            .update(isSame[0].id, newPerson)
            .then(personService => getList())
            .catch(error => {
                setErrorMessage(`Information of ${newPerson.name} has already been removed from the server`)
                setErrorStatus(true)
            })
        } else {
            setErrorMessage(`Added ${newPerson.name}`)    
            PersonsService
            .create(newPerson.name, newPerson.number)
            .then(person => 
                {
                    setPersons(persons.concat(person))
                    setErrorStatus(false)
                })
            .catch(error => {
                console.log(error.response.data.error)
            })
        }
        clearFields()
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }
    
    const handleNewSearch = (event) => {
        PersonsService
        .getAll()
        .then(personList => {
            if (!!event.target.value) {
                const filteredList = personList.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) >= 1)
                return setPersons(filteredList)
            } 
            setPersons(personList)
        })
        
        setNewSearch(event.target.value)
    }
    
    return (
        <div>
        <h2>Phonebook</h2>
        {
            errorStatus &&
            <Notification message={errorMessage} error={errorStatus}/>
        }
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
        {persons.map((person) => 
            <Persons key={person.id} name={person.name} number={person.number} id={person.id}/>
            )}
            </ul>
            </div>
            )
        }
        
        export default App