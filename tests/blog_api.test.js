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

  test('check if have id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  })

  test('test new blog post', async () => {
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

  test('Verify that if the likes property is missing', async () => {
    const newBlog = {
      title: "What a beautiful life",
      author: "Jr. Tony",
      url: "abc.com"
    };
    await api.post('/api/blogs').send(newBlog);
    const resAtEnd = await api.get('/api/blogs');
    expect(resAtEnd.body).toHaveLength(initialBlogs.length + 1);
  })
})

describe("Test delete blog post", () => {
  test("delete a post successfully", async () => {
    const posts = await Blog.find({});
    const deletedPost = posts[0].toJSON();

    await api.delete(`/api/blogs/${deletedPost.id}`).expect(204);

    const postsAtEnd = await Blog.find({});
    expect(postsAtEnd).toHaveLength(initialBlogs.length - 1);
  });
});

describe.only("Test update blog post", () => {
  test("update a post successfully", async () => {
    const posts = await Blog.find({});
    const updatedPost = posts[0].toJSON();
    const updateData = {
      likes: 99
    }
    
    await api.put(`/api/blogs/${updatedPost.id}`).send(updateData);

    const updatePostAtEnd = await Blog.findById(updatedPost.id);
    expect(updatePostAtEnd.likes).toBe(updateData.likes);
  });
});


afterAll(async () => {
  await mongoose.connection.close()
})