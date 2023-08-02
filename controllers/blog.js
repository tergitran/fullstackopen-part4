const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const router = require("express").Router();

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    const user = await User.findById(decodedToken.id);
    const newBlog = {
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes
    }
  
    const blog = new Blog(newBlog);
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id)
    await user.save();
  
    response.status(201).json(result);
  } catch (error) { 
    next(error)
  }
})

router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const blog = await Blog.findById(id);
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(id);
      response.status(204).end();
    } else {
      response.status(403).json({message: 'you can not have access right to delete this post'});
    }
  } catch (error) {
    next(error)
  }
})
router.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes
  };
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true});
  response.json(updateBlog);
})

module.exports = router;
