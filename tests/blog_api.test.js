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
    author: "Tran Dan 2",
    url: "reddit.com",
    likes: 34
  },
]

beforeEach(async () => {
  console.log("JUST SHOW");
  await Blog.deleteMany({})
  let BlogObject = new Blog(initialBlogs[0])
  await BlogObject.save()
  BlogObject = new Blog(initialBlogs[1])
  await BlogObject.save()
})

describe("Test blogs api response", () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  
  test('there are one notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    // console.log(response.body);
    const authors = response.body.map(blog => blog.author)
    console.log(authors);
    expect(authors).toContain('Tran Dan 2')
    // expect(response.body[0].author).toBe('Tran Dan')
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})