const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.password || !body.username){
        return response.status(400).json({error: 'username or password missing'})
    }
    else if (body.password.length < 3 || body.username.length < 3){
        return response.status(400).json({error: 'password or username too short'})
    }
    const notUnique = await User.findOne({ username: body.username })
    if (notUnique){
        return response.status(400).json({error: 'Username must be unique'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter