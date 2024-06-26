const http = require('http')
const express = require('express')
const morgan = require('morgan')
const { nextTick } = require('process')
const app = express()
const fs = require('fs');
const path = require('path');

app.use(express.json())

morgan.token('params', (req) => {
  return JSON.stringify(req.params)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :params'))

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



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})


app.get('/info', (request, response) => {
    const x = persons.length;
    const currentTime = new Date().toLocaleString();
    const info = `Request received at ${currentTime}, ${x} entries in the phonebook`

    response.send(`<p>Request received at ${currentTime}, ${x} entries in the phonebook</p>`);
})


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (!person) {
        return response.status(404).json({ error: 'Person not found' })
    }

    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/persons/:name/:number', (request, response) => {
  const body = request.params  
  const id = Math.random(1000)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } 

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  if (persons.find(person => person.number === body.number)) {
    return response.status(400).json({ 
      error: 'number must be unique' 
    })
  }

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
    

})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})