const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '668d2289ec1f0d44d315357c',
      title: 'a',
      author: 'a',
      url: 'a',
      likes: 7,
      __v: 0
    }
  ]

  const listWithTwoBloga = [
    {
      _id: '668d2289ec1f0d44d315357c',
      title: 'a',
      author: 'a',
      url: 'a',
      likes: 7,
      __v: 0
    },
    {
      _id: '668d39265278c26667d03476',
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 8,
      __v: 0
    },
    {
      title: 'aa',
      author: 'a',
      url: 'aa',
      likes: 9,
      id: '668d6a8d3beec5126cf4d852',
      __v: 0
    }

  ]

  test('when list has more than one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithTwoBloga)
    assert.strictEqual(result, 24)
  })
})

describe('favorite blog', () => {
  const favouriteBlog = [
    {
      _id: '668d39265278c26667d03476',
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 8,
      __v: 0
    }
  ]
  test('favorutie blog has the most likes', () => {
    const result = listHelper.favoriteBlog(favouriteBlog)
    assert.deepStrictEqual(result, {
      _id: '668d39265278c26667d03476',
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 8,
      __v: 0
    })
  })

})

describe('most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '668d2289ec1f0d44d315357c',
      title: 'a',
      author: 'a',
      url: 'a',
      likes: 7,
      __v: 0
    },
    {
      _id: '668d39265278c26667d03476',
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 8,
      __v: 0
    },
    {
      title: 'aa',
      author: 'a',
      url: 'aa',
      likes: 9,
      id: '668d6a8d3beec5126cf4d852',
      __v: 0
    }

  ]
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'a', blogs: 2 })
  })
})


describe('most likes', () => {
  const listWithOneBlog = [
    {
      _id: '668d2289ec1f0d44d315357c',
      title: 'a',
      author: 'a',
      url: 'a',
      likes: 7,
      __v: 0
    },
    {
      _id: '668d39265278c26667d03476',
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 8,
      __v: 0
    },
    {
      title: 'aa',
      author: 'a',
      url: 'aa',
      likes: 9,
      id: '668d6a8d3beec5126cf4d852',
      __v: 0
    }

  ]
  test('author with most likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'a', likes: 16 })
  })
})