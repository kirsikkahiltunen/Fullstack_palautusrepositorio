const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, item) => sum + item.likes, 0)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length===0){
        return 0
    } 
    return blogs.reduce((max, blog) => 
        blog.likes > max.likes ? blog : max)
}

module.exports = { dummy, totalLikes, favoriteBlog }