const { test, after } = require('node:test')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 3)
})

/*  
test('the first note is about HTTP methods', async () => {
const response = await api.get('/api/notes')

const contents = response.body.map(e => e.content)
assert.strictEqual(contents.includes('HTML is easy'), true)
})
*/

after(async () => {
  await mongoose.connection.close()
})