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

router.delete('/blogs/:id', async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
})
router.put('/blogs/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes
  };
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true});
  response.json(updateBlog);
})

module.exports = router;
