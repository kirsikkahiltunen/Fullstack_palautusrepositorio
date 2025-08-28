const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, blogObject) => {
    blogObject.id = blogObject._id.toString()
    delete blogObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)