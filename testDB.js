const mongoose = require('mongoose');
require("dotenv").config();
const config = require("./utils/config");
// console.log("config.MONGODB_URI", config.MONGODB_URI);
// console.log("config.MONGODB_URI", process.env.TEST_MONGODB_URI);

// defined model
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
const Blog = mongoose.model('Blog', blogSchema);

// connect DB
mongoose.connect(process.env.TEST_MONGODB_URI).then(() => {
  console.log('connected to database');
  const newBlog = new Blog({
    title: 'Life is tough',
    author: 'Tran Dan',
    url: 'reddit.com',
    likes: 12
  });
  newBlog.save().then(res => {
    console.log("save successfully", res);
  }).catch(error => {
    console.log("failt to create blog");
  })

  Blog.find({}).then(res => {
    console.log("Blogs: ", res);
  })  
}).catch(error => {
  console.log("error connecting to MongoDB:",error.message);
});