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

test('new blogs can be added', async () => {
    const newBlog = {
        title: 'Luontopolku',
        author: 'Jari Salmi',
        url: 'luontopolku.org',
        likes: 7
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogs = await api.get('/api/blogs')

    assert.strictEqual(blogs.body.length, ++(blogList.length))

    assert((blogs.body.map(blog => blog.title)).includes('Luontopolku'))
})

test('if blog is added without value for likes, the value is 0', async () => {
    const newBlog = {
        title: 'Vege ruokaa',
        author: 'Mikko Joki',
        url: 'vegeruokaa.fi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogs = await api.get('/api/blogs')

    const blog = blogs.body.find((blog) => blog.title === 'Vege ruokaa')

    assert.strictEqual(blog.likes, 0)
})

after (async () => {
    await mongoose.connection.close()
})