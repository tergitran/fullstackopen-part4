const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
  {
    title: "Life is tough",
    author: "Tran Dan",
    url: "reddit.com",
    likes: 12
  },
  {

    title: "Life is tough 2",
    author: "nguyen thi A",
    url: "facebook.com",
    likes: 34
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const promiseArray = initialBlogs.map(blog => new Blog(blog).save());
  await Promise.all(promiseArray)
})

describe("Test blogs api response", () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

  test.only('check if have id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  })

  test.only('test new blog post', async () => {
    const newBlog = {
      title: "What a beautiful life",
      author: "Jr. Tony",
      url: "abc.com",
      likes: 12
    };
    await api.post('/api/blogs').send(newBlog);
    const resAtEnd = await api.get('/api/blogs');
    expect(resAtEnd.body).toHaveLength(initialBlogs.length + 1);
  })

  test.only('check if have id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})