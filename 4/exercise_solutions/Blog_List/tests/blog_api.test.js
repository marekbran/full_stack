const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const lodash = require('lodash')

const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialblogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, 2);
  });

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author 3',
    url: 'http://example.com/3',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);

  assert.strictEqual(response.body.length, helper.initialblogs.length + 1);
  assert.ok(titles.includes(newBlog.title));
});


test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'New blog without likes',
    author: 'Author 4',
    url: 'http://example.com/4',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const addedBlog = lodash.find(response.body, { title: newBlog.title });
  assert.strictEqual(addedBlog.likes, 0);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Author 5',
    url: 'http://example.com/5',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialblogs.length);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without URL',
    author: 'Author 6',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');

  assert.strictEqual(response.body.length, helper.initialblogs.length);
});


after(async () => {
  await mongoose.connection.close()
})
