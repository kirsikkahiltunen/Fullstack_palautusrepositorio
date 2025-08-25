require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')

const app = express()
app.use(express.static('dist'))

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError"){
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      }
]

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(personSum => {
      const dateTime = new Date()
      response.send(`<p>Phonebook has info for ${personSum} people</p> <p> ${dateTime} </p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        response.json(person)
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
    const newId = Math.floor(Math.random()*(Math.floor(100)-Math.ceil(1))+ Math.ceil(1))
    return String(newId)
      
}
app.post('/api/persons', (request, response, next) => {
    const personBody = request.body

    const person = new Person({
        name: personBody.name,
        number: personBody.number,
        id: generateId(),
      })
    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = body.name
      person.number = body.number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})