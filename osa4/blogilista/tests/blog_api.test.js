const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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

describe('.get works as expected', () => {
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
})

describe('addition of blogs', () => {
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
    
    test('if blog is added without field tilte, function returns status code 400', async () => {
        const newBlog = {
            author: 'Hanna Silvennoinen',
            url: 'hannanmatkassa.fi',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    
    test('if blog is added without field url, function returns status code 400', async () => {
        const newBlog = {
            title: 'Hannan matkassa',
            author: 'Hanna Silvennoinen',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of blogs', () => {
    test('if deletion is successful, status code 204 is returned', async () => {
        const blogs = await api.get('/api/blogs')
        const blog = blogs.body[0]
    
        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(204)
    })
    
    test('if deletion is successful, db does not contain blog with title of deleted blog', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]
    
        await api.delete(`/api/blogs/${blogToDelete.id}`)
    
        const blogsAfterDeletion = await api.get('/api/blogs')
    
        assert(!(blogsAfterDeletion.body.map(blog => blog.title)).includes(blogToDelete.title))
    })
    
    test('if deletion is successful the number of blogs decrease by one', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]
    
        await api.delete(`/api/blogs/${blogToDelete.id}`)
    
        const blogsAfterDeletion = await api.get('/api/blogs')
    
        assert.strictEqual(blogsAfterDeletion.body.length, blogs.body.length - 1)
    })

    test('fails with status code 404 if blog does not exist', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]
    
        await api.delete(`/api/blogs/${blogToDelete.id}`)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(404)
    })
})

describe('Updating blogs', () => {
    test('if the likes of blog is successfully updated, the updated number of likes found from database', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToUpdate = blogs.body[0]
        const updatedBlog = {
            title: 'Testiblogi',
            author: 'Maija Meikäläinen',
            url: 'Testiblogi.fi',
            likes: 10
        }
    
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
    
        const blogsAfterUpdate = await api.get('/api/blogs')
        const blogAfterUpdate = blogsAfterUpdate.body[0]
    
        assert.strictEqual(blogAfterUpdate.likes, 10)
    })
    test('fails with status code 404 if blog does not exist', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]
    
        await api.delete(`/api/blogs/${blogToDelete.id}`)

        const nonExistingId = blogToDelete.id
        
        const updatedBlog = {
            title: 'Testiblogi',
            author: 'Maija Meikäläinen',
            url: 'Testiblogi.fi',
            likes: 10
        }
    
        await api
            .put(`/api/blogs/${nonExistingId}`)
            .send(updatedBlog)
            .expect(404)
    })

})


after (async () => {
    await mongoose.connection.close()
})