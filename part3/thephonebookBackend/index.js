const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))
app.use(express.json())
app.use(express.static('build'))

morgan.token('data', request => {
  const body = request.body
  return JSON.stringify(body)
})

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456",
        "visible": true
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "visible": true
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "visible": true
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "visible": true
      }
]



app.get('/', (request, response) => {
    response.send('<h1>The Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let people = 'people'
    const date = new Date()
    if (persons.length === 1) {
        people = 'person'
    }
    response.send(`<div>
    <p>The Phonebook has info of ${persons.length} ${people}</p>
    <p>${date}</p>
    </div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    return (
      response.json(person)
    )
    }
    response.status(404).end()

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const randomId = () => {
  const personId = Math.floor(Math.random()*10000)
  return (
    4 + personId
  )
}

const hasSameName = (newName) => {
  var same = persons.filter((person, index) => {
    return person.name === newName
  },0) 

  if (same.length === 0) {
    return (false)
  }
  return (true)
}

app.post('/api/persons', (request, response) => {
  const object = request.body

if (!object.name || !object.number) {
    return(
      response.status(400).json({error: 'Name or number missing'})
    )
  } else if (hasSameName(object.name)) {
    return(
      response.status(400).json({error: `${object.name} is already in phonebook`})
    )
  }

  const person = {
    id: randomId(),
    name: object.name,
    number: object.number
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})