const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, item) => sum + item.likes, 0)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return 0
    } 
    return blogs.reduce((max, blog) => 
        blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const blogCount = _.countBy(blogs, "author")
    
    const max = _.maxBy(Object.entries(blogCount), ([key, value]) => value)

    return { author:max[0],
        blogs: max[1]
     }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }