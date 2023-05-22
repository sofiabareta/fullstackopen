const express = require('express') // FIRST --> REQUIRE EXPRESS
const app = express() // SECOND --> STORE EXPRESS FUNCTION TO CREATE EXPRESS APPLICATION
const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json()) // THIRD --> COMMAND TO PARSE JSON (MIDDLEWARE)
app.use(express.static('build'))

// FOURTH --> INIT SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) 
        response .status(404).send("<p>NOT FOUND</p>")
    else
        response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    
    if (!person.name || !person.number || persons.find(p => p.name === person.name))
        response.status(400).json({error: 'name must be unique'})
    else {
        person.id = Math.floor(Math.random() * 999)
        persons = persons.concat(person)
    
        response.json(person)
    }
})