require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :data')
)

morgan.token('data', (request) => {
  const body = request.body
  return JSON.stringify(body)
})

app.get('/', (request, response) => {
  response.json('<h1>The Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  let people = 'people'

  Person.count({})
    .then((count) => {
      if (count === 1) {
        people = 'person'
      }
      response.send(`<div>
    <p>The Phonebook has info of ${count} ${people}</p>
    <p>${date}</p>
    </div>`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        console.log('Person not in phonebook')

        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
    visible: true,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log('person updated')
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const object = request.body
  console.log('object below')
  console.log(object)

  /*if (!object.name || !object.number) {
  console.log('inside if');
    return(
      response.status(400).json({error: 'Name or number missing'})
    )
  }*/

  const newPerson = new Person({
    name: object.name,
    number: object.number,
    visible: true,
  })

  newPerson
    .save()
    .then((person) => {
      response.json(person)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error('ERROR MESSAGE: ', error.message)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Validation error occured')
    response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
