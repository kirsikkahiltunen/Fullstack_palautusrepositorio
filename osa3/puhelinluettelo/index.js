const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('content', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

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

const infoSum = () => {
    const peopleCount = persons.length
    return (`Phonebook has info for ${peopleCount} people`)
}

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.get('/info', (request, response) => {
    const dateTime = new Date()
    response.send(`${infoSum()} <p> ${dateTime} </p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        response.status(404).end()
    } else {
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const newId = Math.floor(Math.random()*(Math.floor(100)-Math.ceil(1))+ Math.ceil(1))
    return String(newId)
      
}
app.post('/api/persons', (request, response) => {
    const personBody = request.body

    if (persons.some(person => person.name === personBody.name)) {
        return response.status(400).json({
        error: "name must be unique"
        })
      }
    if (!personBody.name) {
        return response.status(400).json({
          error: "name missing"
        })
      }
    if (!personBody.number) {
        return response.status(400).json({
        error: "number missing"
        })
      }


    const person = {
        name: personBody.name,
        number: personBody.number,
        id: generateId(),
      }
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})