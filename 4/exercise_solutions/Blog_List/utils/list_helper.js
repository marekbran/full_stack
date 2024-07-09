const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
    const blogCount = lodash.countBy(blogs, 'author')
    const maxBlogs = Math.max(...Object.values(blogCount))
    return { author: Object.keys(blogCount).find(key => blogCount[key] === maxBlogs), blogs: maxBlogs }
}

const mostLikes = (blogs) => {
    const authorGroups = lodash.groupBy(blogs, 'author')
    const authorLikes = lodash.mapValues(authorGroups, (blogs) => {
        return lodash.sumBy(blogs, 'likes')
    })
    const maxAuthor = lodash.maxBy(Object.keys(authorLikes), (author) => authorLikes[author])

    return {
        author: maxAuthor,
        likes: authorLikes[maxAuthor]
    }
}

module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}