const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connected to mongoDB')

mongoose.connect(config.mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app