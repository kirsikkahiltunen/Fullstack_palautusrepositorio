const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
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
            
                assert(result.body.error.includes('username or password missing'))
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

            assert(result.body.error.includes('username or password missing'))
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

            assert(result.body.error.includes('password or username too short'))
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

            assert(result.body.error.includes('password or username too short'))
    })

    test('Username must be unique', async () => {
        const newUser = {
            username: 'user1',
            name: 'test user',
            password: 'testpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            assert(result.body.error.includes('Username must be unique'))
    })

    test('User addition is successful if username and password are valid', async () => {
        await User.deleteMany({})
        const newUser = {
            username: 'Mikko123',
            name: 'Mikko Meikäläinen',
            password: 'testpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const users = await api.get('/api/users')

            assert.strictEqual(users.body.length, 1)
            assert((users.body.map(user => user.username)).includes('Mikko123'))
    })


})
after (async () => {
    await mongoose.connection.close()
})