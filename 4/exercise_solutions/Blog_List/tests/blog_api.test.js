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

test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs');
  const blogToDelete = response.body[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const responseAfterDelete = await api.get('/api/blogs');
  assert.strictEqual(responseAfterDelete.body.length, helper.initialblogs.length - 1);

  const titles = responseAfterDelete.body.map(r => r.title);
  assert.ok(!titles.includes(blogToDelete.title));
});

test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs');
  const blogToUpdate = response.body[0];

  const updatedBlog = {
    title: 'Updated title',
    author: 'Updated author',
    url: 'http://example.com/updated',
    likes: blogToUpdate.likes + 1,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200);

  const responseAfterUpdate = await api.get('/api/blogs');
  const updatedBlogFromDb = responseAfterUpdate.body.find(blog => blog.id === blogToUpdate.id);

  assert.strictEqual(updatedBlogFromDb.title, updatedBlog.title);
  assert.strictEqual(updatedBlogFromDb.author, updatedBlog.author);
  assert.strictEqual(updatedBlogFromDb.url, updatedBlog.url);
  assert.strictEqual(updatedBlogFromDb.likes, updatedBlog.likes);
});



after(async () => {
  await mongoose.connection.close()
})
