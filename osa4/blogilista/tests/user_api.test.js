const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const userList = [
    {
        username: 'testUser123',
        name: 'Test',
        password: '123'
    },
    {
        username: 'user1',
        name: 'user',
        password: 'password123'
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(userList[0])
    await userObject.save()
    userObject = new User(userList[1])
    await userObject.save()
})

describe('addition of users', () => {
    test('User cannot be created without password', async () => {
        const newUser = {
                    username: 'test',
                    name: 'Test User'
                }
            
                const result = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)
                    .expect('Content-Type', /application\/json/)
            
                assert(result.body.error.includes('content missing'))
    })

    test('User cannot be created without username', async () => {
        const newUser = {
            name: 'test user',
            password: 'testpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('User validation failed: username: Path `username` is required.'))
    })

    test('Username length must be at least 3 characters', async () => {
        const newUser = {
            username: 'a',
            name: 'test user',
            password: 'testpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))
    })

    test('Password length must be at least 3 characters', async () => {
        const newUser = {
            username: 'test',
            name: 'test user',
            password: 'a'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('password too short'))
    })

    test('Username must be unique', async () => {
        const newUser = {
            username: 'testUser123',
            name: 'test user',
            password: 'testpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('expected `username` to be unique'))
    })

    test('User addition is successful if username and password are valid', async () => {
        const newUser = {
            username: 'test',
            name: 'test user',
            password: 'testpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const users = await api.get('/api/users')

            assert.strictEqual(users.body.length, ++(userList.length))
            assert((users.body.map(user => user.username)).includes('test'))
    })


})
after (async () => {
    await mongoose.connection.close()
})