const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");

const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to database');
}).catch(error => {
  console.log("error connecting to MongoDB:",error.message);
});

app.use(cors())
app.use(express.json())

app.use('/api', blogRouter);

module.exports = app;