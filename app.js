const express = require('express')
const app = express()
const cors = require('cors')
const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const authenRouter = require("./controllers/authen");
const morgan = require("morgan");
const middleware = require('./utils/middleware')

const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to database');
}).catch(error => {
  console.log("error connecting to MongoDB:",error.message);
});

app.use(cors())
app.use(express.json())

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms"
  )
)

app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api', authenRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;