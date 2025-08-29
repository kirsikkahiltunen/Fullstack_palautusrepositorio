const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String
})

userSchema.set('toJSON', {
  transform: (document, userObject) => {
    userObject.id = userObject._id.toString()
    delete userObject._id
    delete userObject.__v
    delete userObject.password
  }
})

module.exports = mongoose.model('User', userSchema)