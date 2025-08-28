const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

const blogList = [

    {
        "title": "Testiblogi",
        "author": "Maija Meikäläinen",
        "url": "Testiblogi.fi",
        "likes": 6
      },
      {
        "title": "Arjen reseptit",
        "author": "Laura Korhonen",
        "url": "arjenreseptit.com",
        "likes": 10
      },
      {
        "title": "Koodarin kulma",
        "author": "Jari Salmi",
        "url": "koodarinkulma.dev",
        "likes": 15
      }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(blogList[0])
    await blogObject.save()
    blogObject = new Blog(blogList[1])
    await blogObject.save()
    blogObject = new Blog(blogList[2])
    await blogObject.save()
})

test('correct number of blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 3)
})

test('check that the identifying field of blogs is named as id', async () => {
    const blogs = await api.get('/api/blogs')

    assert(blogs.body.every(blog => blog.id !== undefined))
})

after (async () => {
    await mongoose.connection.close()
})