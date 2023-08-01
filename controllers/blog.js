const Blog = require("../models/blog");
const router = require("express").Router();

router.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
})

module.exports = router;
